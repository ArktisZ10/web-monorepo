export default function Home() {
  return (
    <main style={{fontFamily: 'system-ui, sans-serif', padding: '4rem', textAlign: 'center'}}>
      <h1 style={{fontSize: '2rem', marginBottom: '0.5rem'}}>ArktisZ10</h1>
      <p style={{marginBottom: '1.5rem'}}>Discover my projects on GitHub.</p>
      <a
        href="https://github.com/ArktisZ10"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open GitHub profile for ArktisZ10"
        style={{display: 'inline-block', padding: '0.6rem 1rem', background:'#111827', color:'#fff', borderRadius:6, textDecoration:'none'}}
      >
        View on GitHub
      </a>
    </main>
  );
}
