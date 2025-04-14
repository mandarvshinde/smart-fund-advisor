
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Fund } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { ArrowUpDown } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface FundListTableProps {
  funds: Fund[];
  currentPage: number;
  totalPages: number;
  sortConfig: {
    key: "returns" | "nav" | "schemeName";
    direction: "asc" | "desc";
  };
  onSort: (key: "returns" | "nav" | "schemeName") => void;
  onPageChange: (page: number) => void;
}

export const FundListTable = ({ 
  funds, 
  currentPage, 
  totalPages, 
  sortConfig, 
  onSort, 
  onPageChange 
}: FundListTableProps) => {

  const getSortIcon = (key: "returns" | "nav" | "schemeName") => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="h-3 w-3 ml-1 opacity-50" />;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUpDown className="h-3 w-3 ml-1 text-finance-primary" />
    ) : (
      <ArrowUpDown className="h-3 w-3 ml-1 text-finance-primary rotate-180" />
    );
  };

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[220px]">
              <Button 
                variant="ghost" 
                size="sm" 
                className="font-medium p-0 h-auto" 
                onClick={() => onSort("schemeName")}
              >
                Fund Name {getSortIcon("schemeName")}
              </Button>
            </TableHead>
            <TableHead className="w-[120px]">
              <Button 
                variant="ghost" 
                size="sm" 
                className="font-medium p-0 h-auto" 
                onClick={() => onSort("returns")}
              >
                1Y Return {getSortIcon("returns")}
              </Button>
            </TableHead>
            <TableHead className="w-[120px]">
              <span className="font-medium">3Y Return</span>
            </TableHead>
            <TableHead className="w-[120px]">
              <span className="font-medium">5Y Return</span>
            </TableHead>
            <TableHead className="w-[100px]">
              <span className="font-medium">NAV</span>
            </TableHead>
            <TableHead className="w-[90px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {funds.map(fund => (
            <TableRow key={fund.schemeCode}>
              <TableCell className="font-medium">
                <div>
                  <div className="truncate max-w-[220px]">{fund.schemeName}</div>
                  <div className="text-xs text-gray-500">{fund.fundHouse || fund.schemeName.split(' ')[0]}</div>
                </div>
              </TableCell>
              <TableCell className={`${fund.returns?.oneYear && fund.returns.oneYear > 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                {fund.returns?.oneYear ? fund.returns.oneYear.toFixed(2) : '0.00'}%
              </TableCell>
              <TableCell className={`${fund.returns?.threeYear && fund.returns.threeYear > 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                {fund.returns?.threeYear ? fund.returns.threeYear.toFixed(2) : '0.00'}%
              </TableCell>
              <TableCell className={`${fund.returns?.fiveYear && fund.returns.fiveYear > 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                {fund.returns?.fiveYear ? fund.returns.fiveYear.toFixed(2) : '0.00'}%
              </TableCell>
              <TableCell>₹{parseFloat(fund.nav).toFixed(2)}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/invest?fund=${fund.schemeCode}`}>
                    Invest
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <div className="py-4 border-t">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={currentPage === i + 1}
                    onClick={() => onPageChange(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </Card>
  );
};

export default FundListTable;
