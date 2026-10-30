import { CreatorHero } from 'components-front-end/creator/components/CreatorHero';
import AuthButtons from './AuthButtons';
export default function HeroSection() { return <CreatorHero actions={<AuthButtons />} />; }
