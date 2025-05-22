<form
  onSubmit={async (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      setSubmitted(true)
    } else {
      alert('Upload failed. Please try again.')
    }
  }}
  className="space-y-4"
>
  <input name="name" type="text" placeholder="Name" required className="w-full p-2 rounded bg-gray-800 border border-gray-700" />
  <input name="email" type="email" placeholder="Email" required className="w-full p-2 rounded bg-gray-800 border border-gray-700" />
  <input name="country" type="text" placeholder="Country" required className="w-full p-2 rounded bg-gray-800 border border-gray-700" />
  <textarea name="address" placeholder="Mailing Address" required rows={3} className="w-full p-2 rounded bg-gray-800 border border-gray-700" />
  <input name="photo" type="file" accept="image/*" required className="w-full" />
  <label className="block">
    <input type="checkbox" required className="mr-2" /> I consent to having my photo flown and publicly shared.
  </label>
  <button
    type="submit"
    className="px-4 py-2 bg-blue-700 rounded text-white font-semibold hover:bg-blue-800"
  >
    Submit Photo
  </button>
</form>