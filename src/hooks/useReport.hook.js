import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
];

const formatTimeCasual = date => {
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return `${month} ${day}, ${year} a las ${hours}:${minutes} ${ampm}`;
};

const usePDFGenerator = () => {
  const [pdf, setPdf] = useState(null);

  const exportPDF = (title, structure, original) => {
    const doc = new jsPDF('p', 'pt', 'a4');
    const formattedDateTime = formatTimeCasual(new Date());

    doc.setTextColor('#9ca3af');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('Sistema de Facturación', 40, 40);

    doc.setTextColor('#000');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(16);
    doc.text(title, 40, 74);

    doc.setTextColor('#4B5563');
    doc.setFontSize(8);
    doc.text('Número de registros: ' + original.length, 40, 94);
    doc.text('Fecha de recuperación: ' + formattedDateTime, 40, 104);

    const headers = ['#', ...structure.map(item => item.toUpperCase())];
    const data = original.map((item, index) => [index + 1, ...item]);

    const styles = {
      fontSize: 8,
      font: 'helvetica',
      fontStyle: 'normal'
    };

    const headStyles = {
      fillColor: [31, 41, 55]
    };

    doc.setProperties({ title });
    doc.autoTable({
      startY: 110,
      head: [headers],
      body: data,
      headStyles,
      styles
    });

    const pages = doc.internal.getNumberOfPages();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);

    for (let currentPage = 1; currentPage <= pages; currentPage++) {
      const horizontalPos = pageWidth / 2;
      const verticalPos = pageHeight - 10;
      doc.setPage(currentPage);
      doc.text(`${currentPage} of ${pages}`, horizontalPos, verticalPos - 10, {
        align: 'center'
      });
    }

    setPdf(doc);
    window.open(URL.createObjectURL(doc.output('blob')));
  };

  const downloadPDF = (filename = 'reporte.pdf') => {
    if (!pdf) return;
    pdf.save(filename);
  };

  return { exportPDF, downloadPDF };
};

export { usePDFGenerator };
