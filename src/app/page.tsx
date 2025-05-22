export default function HomePage() {
  return (
    <div style={{ 
      padding: '40px', 
      backgroundColor: 'white', 
      color: 'black',
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh'
    }}>
      <h1>🚀 All For One Initiative - Test Page</h1>
      <p>If you can see this, the Next.js routing is working correctly!</p>
      <p>Site Status: ✅ WORKING</p>
      <p>Timestamp: {new Date().toLocaleString()}</p>
    </div>
  )
}