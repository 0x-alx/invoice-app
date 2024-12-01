"use client";

import { generateInvoicePDF } from "@/app/actions/generate-pdf";
import { deleteInvoice } from "@/app/actions/invoices";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Invoice } from "@prisma/client";
import { Download, Eye, Trash } from "lucide-react";

const getStatusColor = (status: string) => {
	switch (status) {
		case "Paid":
			return "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400";
		case "Pending":
			return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400";
		case "Overdue":
			return "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400";
		default:
			return "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400";
	}
};

type InvoicesTableProps = {
	invoices: (Invoice & {
		customer: {
			name: string;
			email: string;
			phone: string | null;
		};
		items: {
			id: string;
			description: string;
			quantity: number;
			unitPrice: number;
			// Add any other item fields you need
		}[];
	})[];
};

export const InvoicesTable = ({ invoices }: InvoicesTableProps) => {
	console.log(invoices);
	return (
		<Card>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Invoice</TableHead>
						<TableHead>Customer</TableHead>
						<TableHead>Amount</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Date</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{invoices.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={6}
								className='text-center'
							>
								No invoices found.
							</TableCell>
						</TableRow>
					) : (
						invoices.map((invoice) => (
							<TableRow key={invoice.id}>
								<TableCell className='font-medium'>
									{invoice.invoiceNumber}
								</TableCell>
								<TableCell>
									<div>
										<p className='font-medium'>
											{invoice.customer.name}
										</p>
										<p className='text-sm text-muted-foreground'>
											{invoice.customer.email}
										</p>
									</div>
								</TableCell>
								<TableCell>${invoice.total}</TableCell>
								<TableCell>
									<Badge
										className={getStatusColor(
											invoice.status
										)}
										variant='secondary'
									>
										{invoice.status}
									</Badge>
								</TableCell>
								<TableCell>
									{invoice.createdAt.toLocaleDateString()}
								</TableCell>
								<TableCell>
									<div className='flex items-center gap-2'>
										<form
											onSubmit={async (event) => {
												event.preventDefault();
												const pdfPath =
													await generateInvoicePDF({
														invoice: {
															...invoice,
															customer: {
																name: invoice
																	.customer
																	.name,
																email: invoice
																	.customer
																	.email,
																phone:
																	invoice
																		.customer
																		.phone ||
																	"",
															},
															items: invoice.items.map(
																(item) => ({
																	...item,
																	total:
																		item.quantity *
																		item.unitPrice,
																})
															),
														},
													});
												window.open(pdfPath, "_blank");
											}}
										>
											<Button
												variant='outline'
												size='icon'
												className='h-8 w-8'
												title='Download PDF'
											>
												<Eye className='h-4 w-4' />
											</Button>
										</form>
										<Button
											variant='outline'
											size='icon'
											className='h-8 w-8'
											title='Download PDF'
											onClick={async () => {
												const pdfPath =
													await generateInvoicePDF({
														invoice: {
															...invoice,
															customer: {
																name: invoice
																	.customer
																	.name,
																email: invoice
																	.customer
																	.email,
																phone:
																	invoice
																		.customer
																		.phone ||
																	"",
															},
															items: invoice.items.map(
																(item) => ({
																	...item,
																	total:
																		item.quantity *
																		item.unitPrice,
																})
															),
														},
													});
												// Create an anchor element and trigger download
												const link =
													document.createElement("a");
												link.href = pdfPath;
												link.download = `invoice-${invoice.invoiceNumber}.pdf`;
												document.body.appendChild(link);
												link.click();
												document.body.removeChild(link);
											}}
										>
											<Download className='h-4 w-4' />
										</Button>
										<Button
											variant='outline'
											size='icon'
											className='h-8 w-8'
											title='Delete'
											onClick={async () => {
												await deleteInvoice(invoice.id);
											}}
										>
											<Trash className='h-4 w-4' />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</Card>
	);
};
