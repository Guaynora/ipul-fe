import { useQuery } from '@apollo/client/react';
import { GetExpenseReportDocument } from '@infrastructure/graphql/__generated__/graphql';
import type { ReportFilter } from '@domain/report.entity';

export function useExpenseReport(filter?: ReportFilter) {
  const { data, loading, error } = useQuery(GetExpenseReportDocument, {
    variables: { filter: filter ?? null },
  });
  return {
    report: data?.expenseReport ?? null,
    loading,
    error,
  };
}
