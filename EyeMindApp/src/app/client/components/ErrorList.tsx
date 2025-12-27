export function ErrorList({
  errors,
  onRemove,
}: {
  errors: string[]
  onRemove: (error: string) => void
}) {
  if (errors.length === 0) {
    return null
  }

  return (
    <div className='flex flex-col gap-2'>
      <h3 className='text-red-500 font-bold'>Errors:</h3>
      {errors.map((error) => (
        <div className='flex items-center gap-2'>
          <span className='text-red-500'>{error}</span>
          <button
            onClick={() => onRemove(error)}
            className='bg-red-500 text-white px-2 py-1 rounded-md cursor-pointer'>
            Dismiss
          </button>
        </div>
      ))}
    </div>
  )
}
