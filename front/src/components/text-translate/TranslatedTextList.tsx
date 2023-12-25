"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { useTextTranslateValue } from "./textTranslateProvider";

export default function TranslatedTextList() {
  const columns = [
    { key: "language", label: "Language" },
    { key: "input", label: "Input" },
    { key: "output", label: "Output" },
  ];

  const { translatedTextList } = useTextTranslateValue();
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {translatedTextList.map((row) => (
          <TableRow key={row.key}>
            {(columnKey) => (
              <TableCell>{getKeyValue(row, columnKey)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
