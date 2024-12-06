import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
//   import { SizeData } from "@/lib/types";

export function SizeTable({ data }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-indigo-600 hover:bg-indigo-500 rounded-xl">
          <TableHead className="w-[100px] text-center text-neutral-100">Size</TableHead>
          <TableHead className="text-center text-neutral-100">Length</TableHead>
          <TableHead className="text-center text-neutral-100">Width</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item) => (
          <TableRow key={item.sizeLabel} className="text-center">
            <TableCell className="font-medium text-center">{item.sizeLabel}</TableCell>
            <TableCell className="text-center">{item.length}</TableCell>
            <TableCell className="text-center">{item.width}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
