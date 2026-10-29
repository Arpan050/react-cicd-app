import { greeting } from './greeting.js';
export default function App() {
  return (
    <div style={{ fontFamily: 'Arial', textAlign: 'center', marginTop: '80px' }}>
      <h1>{greeting('World')}</h1>
      <p>React + Docker + Jenkins + SonarQube + Trivy + Terraform + EKS</p>
    </div>
  );
}
