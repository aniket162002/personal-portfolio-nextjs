'use client'

import { useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { personalData } from '@/lib/utils';

export default function GenerateResume() {
  useEffect(() => {
    // This function will run only on the client side
    const generatePDF = () => {
      const doc = new jsPDF();
      
      // Add content to PDF
      doc.setFontSize(22);
      doc.setTextColor(0, 51, 153);
      doc.text('Aniket Shinde', 105, 20, { align: 'center' });
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('Software Engineer', 105, 28, { align: 'center' });
      
      doc.setFontSize(10);
      const contactInfo = `${personalData.email} | ${personalData.phone} | github.com/aniket162002 | linkedin.com/in/aniket-shinde-a10018231`;
      doc.text(contactInfo, 105, 36, { align: 'center' });
      
      // Professional Summary
      doc.setFontSize(14);
      doc.setTextColor(0, 51, 153);
      doc.text('Professional Summary', 14, 50);
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      const summary = personalData.summary;
      const splitSummary = doc.splitTextToSize(summary, 180);
      doc.text(splitSummary, 14, 58);
      
      // Skills
      const yPos = 58 + splitSummary.length * 5;
      doc.setFontSize(14);
      doc.setTextColor(0, 51, 153);
      doc.text('Skills', 14, yPos);
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text('Programming: JavaScript, Python, Java, C++, SQL', 14, yPos + 8);
      doc.text('Web/Frameworks: React.js, Node.js, Next.js, Spring Boot, HTML, CSS, TailwindCSS', 14, yPos + 14);
      doc.text('Mobile: Flutter', 14, yPos + 20);
      doc.text('Database: MongoDB, MySQL', 14, yPos + 26);
      doc.text('Tools: Git, GitHub, Apache Kafka', 14, yPos + 32);
      doc.text('Concepts: Machine Learning, RESTful APIs, Agile Development', 14, yPos + 38);
      
      // Experience
      doc.setFontSize(14);
      doc.setTextColor(0, 51, 153);
      doc.text('Work Experience', 14, yPos + 48);
      
      // Add experience entries
      let expY = yPos + 56;
      
      // SUD Life
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('SUD Life | Software Engineer Trainee', 14, expY);
      doc.setFontSize(10);
      doc.text('Dec 2024 – Present', 14, expY + 6);
      doc.text('• Contributing to enterprise API projects for digital insurance solutions.', 18, expY + 12);
      doc.text('• Maintaining and enhancing legacy systems based on SMART400 architecture.', 18, expY + 18);
      doc.text('• Providing support and development for system improvements and debugging.', 18, expY + 24);
      
      // Utkarsh Bank
      expY += 30;
      doc.setFontSize(12);
      doc.text('Utkarsh Small Finance Bank | Software Engineer', 14, expY);
      doc.setFontSize(10);
      doc.text('Aug 2024 – Dec 2024', 14, expY + 6);
      doc.text('• Managed and optimized IT infrastructure to ensure seamless banking system integration.', 18, expY + 12);
      doc.text('• Collaborated with cross-functional teams to implement secure and efficient technology solutions.', 18, expY + 18);
      
      // Add more sections as needed
      
      // Save the PDF
      doc.save('aniket-shinde-resume.pdf');
    };
    
    generatePDF();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">Resume Generated!</h1>
        <p className="text-center mb-6">Your resume has been generated and downloaded.</p>
        <div className="flex justify-center">
          <a 
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Return to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
