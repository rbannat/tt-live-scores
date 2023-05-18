export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(`Die App wurde aktualisiert. Jetzt neu laden?`)

  if (answer === true) {
    window.location.reload()
  }
}
