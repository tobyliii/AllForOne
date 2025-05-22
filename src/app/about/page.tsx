export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '2rem', background: 'linear-gradient(to bottom, #000, #1a237e)', color: 'white' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>About the Campaign</h1>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.75' }}>
          <strong>All for One</strong> is a global youth outreach initiative supporting an upcoming suborbital spaceflight aboard Blue Origin’s New Shepard. This campaign invites children from all over the world to submit photos of themselves to be printed and flown to space—turning dreams into tangible inspiration.
        </p>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.75' }}>
          My name is Toby Li. As an Asian Canadian aerospace engineer, I’ve spent years advancing spaceflight research and equity. Inspired by Dr. Leroy Chiao, the first Asian-American to perform a spacewalk, I’m striving to become the first Asian Canadian in space—not just for me, but for all those who need to see it to believe it.
        </p>
        <p style={{ lineHeight: '1.75' }}>
          With your support, this campaign will reach thousands of underrepresented students, bringing space closer to the people who need it most.
        </p>
      </div>
    </div>
  )
}
