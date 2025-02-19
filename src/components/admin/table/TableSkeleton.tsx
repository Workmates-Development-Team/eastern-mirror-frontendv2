import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'
import React from 'react'

const TableSkeleton = () => {
  return (
    <TableRow>
    <TableCell>
      <Skeleton className="h-7" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-7" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-7" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-7" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-7" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-7" />
    </TableCell>
  </TableRow>
  )
}

export default TableSkeleton