"use client";

import { Pagination } from "antd";

interface ProductPaginationProps {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number, pageSize: number) => void;
  loading?: boolean;
}

export default function ProductPagination({
  current,
  total,
  pageSize,
  onChange,
  loading = false,
}: ProductPaginationProps) {
  if (total === 0) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: 32,
        paddingBottom: 16,
      }}
    >
      <Pagination
        current={current}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
        showSizeChanger
        pageSizeOptions={[12, 24, 48]}
        showTotal={(tot, range) =>
          `${range[0]}–${range[1]} จาก ${tot.toLocaleString()} รายการ`
        }
        disabled={loading}
        style={{ fontWeight: 500 }}
      />
    </div>
  );
}
