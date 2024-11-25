"use client";

import { deleteCustomer } from "@/app/actions/customers";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Customer = {
  id: string
  name: string
  email: string
  phone?: string | null
  createdAt: Date
}

type CustomersTableProps = {
  customers: Customer[]
}

export const CustomersTable = ({ customers }: CustomersTableProps) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!customerToDelete || !confirmDelete) return

    try {
      setIsDeleting(true)
      const result = await deleteCustomer(customerToDelete.id)

      if (!result.success) {
        throw new Error(result.error)
      }

      toast.success("Customer deleted successfully")
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete customer")
    } finally {
      setIsDeleting(false)
      setCustomerToDelete(null)
      setConfirmDelete(false)
    }
  }

  const resetModal = () => {
    setCustomerToDelete(null)
    setConfirmDelete(false)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Total Spent</TableHead>
            <TableHead className="hidden md:table-cell">Invoices</TableHead>
            <TableHead className="hidden md:table-cell">Last Invoice</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No customers found.
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer) => (
              <TableRow key={customer.id} className="group">
                <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={`https://avatar.vercel.sh/${customer.email}`}
                      alt={customer.name}
                    />
                    {/* <AvatarFallback>
                      {customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback> */}
                    </Avatar>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">
                      {customer.email}
                    </p>
                  </div>
                </div>
              </TableCell>
                <TableCell className="hidden md:table-cell">
                $12,499.00
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  8
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  Mar 11, 2024
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline" className="px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400">Active</Badge>
                </TableCell>
                <TableCell className="w-[100px] relative p-0">
                  <div className="invisible absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 group-hover:visible">
                    <Button variant="outline" size="icon">
                      <Pencil className="w-4 h-4 content-center" />
                  </Button>
                  <Button variant="outline" size="icon" className="hover:bg-red-500/10" onClick={() => setCustomerToDelete(customer)}>
                    <Trash className="w-4 h-4 content-center text-red-500" />
                  </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Dialog open={!!customerToDelete} onOpenChange={(open) => !open && resetModal()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-destructive">Delete Customer</DialogTitle>
            <DialogDescription className="pt-4">
              You are about to delete the following customer:
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="rounded-lg bg-muted p-4 space-y-2">
              <div className="grid grid-cols-3 gap-1">
                <span className="text-muted-foreground">Name:</span>
                <span className="col-span-2 font-medium">{customerToDelete?.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <span className="text-muted-foreground">Email:</span>
                <span className="col-span-2">{customerToDelete?.email}</span>
              </div>
              {/* {customerToDelete?.company && (
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">Company:</span>
                  <span className="col-span-2">{customerToDelete.company}</span>
                </div>
              )} */}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg bg-destructive/10 p-4 text-destructive text-sm">
              <p>This action cannot be undone. This will permanently delete:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Customer profile and contact information</li>
                <li>All associated records and history</li>
                <li>Any linked data or relationships</li>
              </ul>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="confirm-delete"
                checked={confirmDelete}
                onCheckedChange={(checked) => setConfirmDelete(checked as boolean)}
              />
              <Label htmlFor="confirm-delete" className="text-sm">
                I understand that this action is irreversible and I want to proceed with deletion
              </Label>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={resetModal}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={!confirmDelete || isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Customer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}