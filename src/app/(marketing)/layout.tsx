type MarketingLayoutProps = {
  children: React.ReactNode;
};

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return <div className="flex min-h-dvh flex-1 flex-col">{children}</div>;
}
