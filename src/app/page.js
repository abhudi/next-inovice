import CreateInvoice from "@/components/Invoice/CreateInvoice";
import ListInvoice from "@/components/Invoice/ListInvoice";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex justify-center min-h-[82vh]">
      <section className="w-full px-2 max-w-[1000px]">
        <div className="flex justify-between">
          <h3 className="text-3xl font-semibold">Invoice Manager</h3>
          <CreateInvoice />
        </div>
        <Separator className="my-2 border-b-[2px] border-color-light-blue" />
        <ListInvoice />
      </section>
    </div>
  );
}
