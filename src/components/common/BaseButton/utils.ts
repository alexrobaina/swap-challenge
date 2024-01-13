export const setType = (type: string) => {
  switch (type) {
    case 'primary':
      return 'w-full w-auto rounded-2xl bg-[#311C31] px-3 py-2 text-center text-xl font-semibold text-primary-500  shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#311C31] iconPrimary'
    case 'secondary':
      return 'w-full w-auto rounded px-2 py-1 text-xl font-semibold text-primary-950 shadow-sm ring-1 ring-inset ring-primary-300 hover:bg-primary-100 iconSecondary'
    case 'tertiary':
      return 'w-full w-auto bg-transparent hover:bg-primary-200 text-gray-600 hover:bg-primary-50 iconTertiary'
    case 'delete':
      return 'w-full w-auto justify-center rounded-2xl bg-red-600 px-3 py-2 text-xl font-semibold text-primary-500 shadow-sm hover:bg-red-500 sm:ml-3'
    default:
      return 'w-full w-auto rounded-2xl bg-[#311C31] px-3 py-2 text-center text-xl font-semibold text-primary-500 shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#311C31]'
  }
}

export const setSize = (size: string) => {
  switch (size) {
    case 'small':
      return 'py-2 px-4 text-base w-1/2 '
    case 'medium':
      return 'py-2 px-4 text-base'
    case 'large':
      return 'py-3 px-6 text-lg'
    default:
      return 'py-2 px-4 text-base'
  }
}
