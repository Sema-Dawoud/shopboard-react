import tulipLogo from '../../assets/tulip-logo.svg';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className }: BrandLogoProps) {
  const classes = className ? `logo ${className}` : 'logo';

  return (
    <Link className={classes} to="/" aria-label="ShopBoard Beauty home">
      <img src={tulipLogo} alt="" width="39" height="47" />
      <span className="logo-wordmark">
        ShopBoard<span>beauty</span>
      </span>
    </Link>
  );
}
