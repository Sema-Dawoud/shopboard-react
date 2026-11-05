import tulipLogo from '../assets/tulip-logo.svg';

interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className }: BrandLogoProps) {
  const classes = className ? `logo ${className}` : 'logo';

  return (
    <a className={classes} href="#home" aria-label="ShopBoard Beauty home">
      <img src={tulipLogo} alt="" width="39" height="47" />
      <span className="logo-wordmark">
        ShopBoard<span>beauty</span>
      </span>
    </a>
  );
}
