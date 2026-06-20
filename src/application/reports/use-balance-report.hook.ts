import { useQuery } from '@apollo/client/react';
import { GetBalanceReportDocument } from '@infrastructure/graphql/__generated__/graphql';
import type { ReportFilter } from '@domain/report.entity';

export function useBalanceReport(filter?: ReportFilter) {
  const { data, loading, error } = useQuery(GetBalanceReportDocument, {
    variables: { filter: filter ?? null },
  });
  return {
    report: data?.balanceReport ?? null,
    loading,
    error,
  };
}
