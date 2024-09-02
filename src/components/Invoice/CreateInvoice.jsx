"use client"
import React, { useState } from 'react'
import ActionModal from '../widgets/ActionModal'
import { Button } from '../ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from '../ui/input'
import { LoadingButton } from '../widgets/Loader'
import { useRouter, useSearchParams } from "next/navigation";
import { createInvoice } from '@/actions/invoiceActions'
import { toast } from 'react-toastify';
const customers = [
  {
    "id": 1,
    "name": "John Doe",
    "image": "https://i.pravatar.cc/400?img=70",
    "email": "johndoe@example.com"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "image": "https://i.pravatar.cc/400?img=69",
    "email": "janesmith@example.com"
  },
  {
    "id": 3,
    "name": "Alice Johnson",
    "image": "https://i.pravatar.cc/400?img=68",
    "email": "alicejohnson@example.com"
  },
  {
    "id": 4,
    "name": "Bob Brown",
    "image": "https://i.pravatar.cc/400?img=67",
    "email": "bobbrown@example.com"
  },
  {
    "id": 5,
    "name": "Charlie Davis",
    "image": "https://i.pravatar.cc/400?img=66",
    "email": "charliedavis@example.com"
  },
  {
    "id": 6,
    "name": "Eva Green",
    "image": "https://i.pravatar.cc/400?img=65",
    "email": "evagreen@example.com"
  },
  {
    "id": 7,
    "name": "Frank Harris",
    "image": "https://i.pravatar.cc/400?img=64",
    "email": "frankharris@example.com"
  },
  {
    "id": 8,
    "name": "Grace Lee",
    "image": "https://i.pravatar.cc/400?img=63",
    "email": "gracelee@example.com"
  },
  {
    "id": 9,
    "name": "Henry Clark",
    "image": "https://i.pravatar.cc/400?img=62",
    "email": "henryclark@example.com"
  },
  {
    "id": 10,
    "name": "Ivy Walker",
    "image": "https://i.pravatar.cc/400?img=61",
    "email": "ivywalker@example.com"
  }
];


const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required.",
  }),
  status: z.string().min(2, {
    message: "Status is required.",
  }),
  amount: z.string().min(2, {
    message: "Amount is required.",
  }),
})


const CreateInvoice = () => {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      status: "",
      amount: "Unpaid",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values) {
    const { name, amount, status } = values;
    const customer = customers.find((c) => c.name === name);
    const formData = {
      amount,
      customer,
      status,
      id: id ? id : ""

    }

    if (id) {
      //update
    }
    else {
      //create
      const res = await createInvoice(formData)
      console.log(res);

      if (res?.error) {
        toast.error(res?.error);
      }
      if (res?.message) {
        toast.success(res?.error);

      }
    }
  }
  return (
    <div>
      <ActionModal
        title="Create Invoice"
        desc="Create a New Invoice"
        trigger={
          <Button className="text-white spac-x-1"><span> Create Invoice</span>
            <span className="text-lg">+</span>
          </Button>
        }
        open={open}
        setOpen={setOpen}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Customer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Customer</SelectLabel>
                        <>{
                          customers?.map((item) => {
                            const { name } = item
                            return (
                              <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>
                            )
                          })
                        }
                        </>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Amount" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Unpaid" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Unpaid
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Paid" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Paid
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {
              isLoading ? (
                <LoadingButton btnText={"Loading..."} btnClass="w-full" btnVariant={"outline"} />
              ) : (

                <Button className="w-full" type="submit" >Submit</Button>
              )
            }
          </form>
        </Form>
      </ActionModal>
    </div>
  )
}

export default CreateInvoice
