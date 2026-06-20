import { useQuery } from '@apollo/client/react';
import { GetIncomeReportDocument } from '@infrastructure/graphql/__generated__/graphql';
import type { ReportFilter } from '@domain/report.entity';

export function useIncomeReport(filter?: ReportFilter) {
  const { data, loading, error } = useQuery(GetIncomeReportDocument, {
    variables: { filter: filter ?? null },
  });
  return {
    report: data?.incomeReport ?? null,
    loading,
    error,
  };
}
