import jsPDF from "jspdf";

export function generatePDF(cvData: any): Buffer {
    const doc = new jsPDF();
    let yPosition = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;

    // Helper function to add text with word wrap
    const addText = (text: string, fontSize: number = 10, isBold: boolean = false) => {
        doc.setFontSize(fontSize);
        doc.setFont("helvetica", isBold ? "bold" : "normal");
        const lines = doc.splitTextToSize(text, maxWidth);
        lines.forEach((line: string) => {
            if (yPosition > 280) {
                doc.addPage();
                yPosition = 20;
            }
            doc.text(line, margin, yPosition);
            yPosition += fontSize * 0.5;
        });
    };

    // Name (centered, large)
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    const name = cvData.personal?.name || "Resume";
    doc.text(name, pageWidth / 2, yPosition, { align: "center" });
    yPosition += 10;

    // Contact Info (centered)
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const contactParts = [
        cvData.personal?.email,
        cvData.personal?.phone,
        cvData.personal?.location,
        cvData.personal?.linkedin,
    ].filter(Boolean);
    const contactLine = contactParts.join(" | ");
    doc.text(contactLine, pageWidth / 2, yPosition, { align: "center" });
    yPosition += 10;

    // Horizontal line
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 8;

    // Professional Summary
    if (cvData.professionalSummary) {
        addText("PROFESSIONAL SUMMARY", 12, true);
        yPosition += 2;
        addText(cvData.professionalSummary);
        yPosition += 6;
    }

    // Experience
    if (cvData.experience && cvData.experience.length > 0) {
        addText("EXPERIENCE", 12, true);
        yPosition += 4;

        cvData.experience.forEach((exp: any) => {
            // Company and dates
            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");
            doc.text(exp.company || "", margin, yPosition);
            const dates = `${exp.startDate || ""} - ${exp.endDate || ""}`;
            doc.text(dates, pageWidth - margin, yPosition, { align: "right" });
            yPosition += 5;

            // Title and location
            doc.setFontSize(10);
            doc.setFont("helvetica", "italic");
            doc.text(exp.title || "", margin, yPosition);
            if (exp.location) {
                doc.text(exp.location, pageWidth - margin, yPosition, { align: "right" });
            }
            yPosition += 5;

            // Bullets
            doc.setFont("helvetica", "normal");
            if (exp.bullets && exp.bullets.length > 0) {
                exp.bullets.forEach((bullet: string) => {
                    const bulletLines = doc.splitTextToSize(`• ${bullet}`, maxWidth - 5);
                    bulletLines.forEach((line: string) => {
                        if (yPosition > 280) {
                            doc.addPage();
                            yPosition = 20;
                        }
                        doc.text(line, margin + 5, yPosition);
                        yPosition += 5;
                    });
                });
            }
            yPosition += 3;
        });
    }

    // Education
    if (cvData.education && cvData.education.length > 0) {
        addText("EDUCATION", 12, true);
        yPosition += 4;

        cvData.education.forEach((edu: any) => {
            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");
            doc.text(edu.institution || "", margin, yPosition);
            if (edu.graduationDate) {
                doc.text(edu.graduationDate, pageWidth - margin, yPosition, { align: "right" });
            }
            yPosition += 5;

            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            const degreeText = [edu.degree, edu.field].filter(Boolean).join(", ");
            doc.text(degreeText, margin, yPosition);
            yPosition += 5;

            if (edu.gpa) {
                doc.text(`GPA: ${edu.gpa}`, margin, yPosition);
                yPosition += 5;
            }
            yPosition += 2;
        });
    }

    // Skills
    if (cvData.skills) {
        addText("SKILLS", 12, true);
        yPosition += 4;

        if (cvData.skills.technical && cvData.skills.technical.length > 0) {
            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.text("Technical Skills: ", margin, yPosition);
            doc.setFont("helvetica", "normal");
            const techSkills = cvData.skills.technical.join(", ");
            const techLines = doc.splitTextToSize(techSkills, maxWidth - 40);
            doc.text(techLines, margin + 35, yPosition);
            yPosition += techLines.length * 5;
        }

        if (cvData.skills.languages && cvData.skills.languages.length > 0) {
            doc.setFont("helvetica", "bold");
            doc.text("Languages: ", margin, yPosition);
            doc.setFont("helvetica", "normal");
            doc.text(cvData.skills.languages.join(", "), margin + 25, yPosition);
            yPosition += 5;
        }

        if (cvData.skills.certifications && cvData.skills.certifications.length > 0) {
            doc.setFont("helvetica", "bold");
            doc.text("Certifications: ", margin, yPosition);
            doc.setFont("helvetica", "normal");
            doc.text(cvData.skills.certifications.join(", "), margin + 30, yPosition);
            yPosition += 5;
        }
    }

    // Return as buffer
    return Buffer.from(doc.output("arraybuffer"));
}
