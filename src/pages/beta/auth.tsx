const Auth = () => {
  const handleLogout = async () => {
    const res = await fetch('/api/auth/logout', {
      method: 'GET',
    })

    console.log('got response', res)
  }

  return (
    <div>
      Authentication
      <button type="button" onClick={handleLogout}>
        Log out
      </button>
    </div>
  )
}

export default Auth
