'use server'

import { Invoice } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

type Props = {
    invoice: Invoice & {
        customer: {
            name: string;
            phone: string;
            email: string;
        };
        items: {
            description: string;
            quantity: number;
            unitPrice: number;
            total: number;
        }[];
    }
}
//fix for pdfkit not being able to find the Helvetica.afm file
function ensureHelveticaAFM() {
    const sourcePath = path.resolve("node_modules/pdfkit/js/data/Helvetica.afm");
    const destDir = path.resolve(".next/server/vendor-chunks/data");
    const destPath = path.join(destDir, "Helvetica.afm");
  
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
  
    if (!fs.existsSync(destPath)) {
      fs.copyFileSync(sourcePath, destPath);
    }
  }

// Create the PDF document
export async function generateInvoicePDF({ invoice }: Props) {
    ensureHelveticaAFM()

    console.log(invoice)
    // Create a unique filename using the invoice ID
    const fileName = `invoice-${invoice.id}.pdf`;
    const filePath = path.join(process.cwd(), 'public', 'temp', fileName);
    
    // Ensure the temp directory exists
    fs.mkdirSync(path.join(process.cwd(), 'public', 'temp'), { recursive: true });
    
    const doc = new PDFDocument({
        margin: 50,
        size: 'A4',
        autoFirstPage: true,
        bufferPages: true
    });
    
    // Pipe PDF to the file in the public/temp directory
    doc.pipe(fs.createWriteStream(filePath));

    // Add company logo/header
    doc.fontSize(20)
       .text('Your Company Name', 50, 50)
       .fontSize(10)
       .text('123 Business Street', 50, 75)
       .text('City, State 12345', 50, 90)
       .text('Phone: (555) 555-5555', 50, 105);

    // Add invoice details
    doc.fontSize(16)
       .text('INVOICE', 450, 50)
       .fontSize(10)
       .text(`Invoice Number: ${invoice.invoiceNumber}`, 450, 75)
       .text(`Date: ${new Date().toLocaleDateString()}`, 450, 105)
       .text('Due Date: ' + new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString(), 450, 120);

    // Add client information
    doc.fontSize(10)
       .text(`Bill To:`, 50, 150)
       .text(`${invoice.customer.name}`, 50, 165)
       .text(`${invoice.customer.phone}`, 50, 180)
       .text(`${invoice.customer.email}`, 50, 195);

    // Create invoice table header
    const invoiceTop = 250;
    doc.fontSize(10)
       .text('Item', 50, invoiceTop)
       .text('Description', 150, invoiceTop)
       .text('Quantity', 280, invoiceTop, { width: 90, align: 'right' })
       .text('Unit Price', 370, invoiceTop, { width: 90, align: 'right' })
       .text('Total', 460, invoiceTop, { width: 90, align: 'right' });

    // Draw a line
    doc.moveTo(50, invoiceTop + 15)
       .lineTo(550, invoiceTop + 15)
       .stroke();

    // Add sample item
    let itemStart = invoiceTop + 25;
    invoice.items.forEach((item) => {
        doc.text(item.description, 50, itemStart)
            .text(item.quantity.toString(), 280, itemStart, { width: 90, align: 'right' })
            .text(`$${item.unitPrice.toString()}`, 370, itemStart, { width: 90, align: 'right' })
            .text(`$${item.total.toString()}`, 460, itemStart, { width: 90, align: 'right' });
        itemStart += 15;
    });


    // Add total
    const total = itemStart + 100;
    doc.moveTo(50, total - 10)
       .lineTo(550, total - 10)
       .stroke();
    
    doc.fontSize(10)
       .text('Subtotal:', 380, total)
       .text(`$${invoice.subtotal}`, 460, total, { width: 90, align: 'right' })
       .text('Tax (10%):', 380, total + 20)
       .text(`$${invoice.tax}`, 460, total + 20, { width: 90, align: 'right' })
       .text('Total:', 380, total + 40)
       .fontSize(12)
       .text(`$${invoice.total}`, 460, total + 40, { width: 90, align: 'right' });

    // Add footer
    doc.fontSize(10)
       .text('Thank you for your business!', 50, 700)
       .text('Payment is due within 30 days', 50, 715)
       .text('Please include invoice number on your payment', 50, 730);

    // Finalize the PDF
    doc.end();

    // Return the path relative to public directory
    return `/temp/${fileName}`;

}


