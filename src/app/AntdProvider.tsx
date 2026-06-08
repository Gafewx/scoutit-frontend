"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, App } from "antd";

const scoutitTheme = {
  token: {
    colorPrimary: "#2563eb",
    colorBgBase: "#ffffff",
    colorTextBase: "#0f172a",
    colorBorder: "#e2e8f0",
    colorBorderSecondary: "#f1f5f9",
    borderRadius: 8,
    borderRadiusLG: 12,
    fontFamily:
      "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: 14,
    colorLink: "#2563eb",
    colorLinkHover: "#1d4ed8",
  },
  components: {
    Button: {
      primaryColor: "#ffffff",
      defaultBorderColor: "#e2e8f0",
      defaultColor: "#475569",
    },
    Card: {
      headerBg: "transparent",
      boxShadow: "none",
    },
    Input: {
      colorBgContainer: "#f8fafc",
      colorBorder: "#e2e8f0",
    },
    Menu: {
      itemColor: "#64748b",
      itemHoverColor: "#0f172a",
      itemSelectedColor: "#2563eb",
      horizontalItemHoverBg: "transparent",
      horizontalItemSelectedBg: "transparent",
      activeBarBorderWidth: 0,
    },
    Tag: {
      defaultBg: "#eff6ff",
      defaultColor: "#1d4ed8",
    },
  },
};

export default function AntdProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AntdRegistry>
      <ConfigProvider theme={scoutitTheme}>
        <App>{children}</App>
      </ConfigProvider>
    </AntdRegistry>
  );
}
