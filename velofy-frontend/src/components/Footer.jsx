export function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <p style={styles.text}>&copy; {anoAtual} Velofy Finanças Patrocinadas. Todos os direitos reservados.</p>
      <div style={styles.badgeContainer}>
        <span style={styles.badge}>FIAP INTEGRATED PROJECT</span>
      </div>
    </footer>
  );
}

const styles = {
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-card)', padding: '20px 40px', borderTop: '1px solid var(--borda)', marginTop: 'auto' },
  text: { color: 'var(--texto-secundario)', fontSize: '13px' },
  badgeContainer: { display: 'flex', gap: '10px' },
  badge: { backgroundColor: 'var(--bg-input)', color: 'var(--verde-velofy)', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', border: '1px solid var(--borda)' }
};