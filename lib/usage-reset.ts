import { prisma } from './prisma';

export async function checkAndResetUsage(userId: string): Promise<void> {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { lastResetDate: true, optimizationsUsedThisMonth: true }
    });

    if (!user) return;

    const now = new Date();
    const lastReset = new Date(user.lastResetDate);

    // Check if we're in a new month
    const needsReset =
        now.getMonth() !== lastReset.getMonth() ||
        now.getFullYear() !== lastReset.getFullYear();

    if (needsReset) {
        await prisma.user.update({
            where: { id: userId },
            data: {
                optimizationsUsedThisMonth: 0,
                lastResetDate: now
            }
        });
    }
}

export async function canUserOptimize(userId: string): Promise<{ canOptimize: boolean; reason?: string }> {
    await checkAndResetUsage(userId);

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { plan: true, optimizationsUsedThisMonth: true }
    });

    if (!user) {
        return { canOptimize: false, reason: 'User not found' };
    }

    if (user.plan === 'UNLIMITED') {
        return { canOptimize: true };
    }

    if (user.plan === 'FREE' && user.optimizationsUsedThisMonth >= 3) {
        return { canOptimize: false, reason: 'Free plan limit reached (3/month)' };
    }

    if (user.plan === 'PRO' && user.optimizationsUsedThisMonth >= 50) {
        return { canOptimize: false, reason: 'Pro plan limit reached (50/month)' };
    }

    return { canOptimize: true };
}
