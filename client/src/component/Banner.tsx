import { useEffect, useState } from "react"

type InputBanner = {
  className?: string
  type: "Success" | "Error"
  heading: string
  message: string
  timeout?: number
}

export default function useBanner() {
  const [isVisible, setIsVisible] = useState(true)

  const showBanner = () => setIsVisible(true)
  const hideBanner = () => setIsVisible(false)

  const [bannerData, setBannerData] = useState<InputBanner | null>(null)

  useEffect(() => {
    if (bannerData) {
      showBanner()
    }
  }, [bannerData])

  useEffect(() => {
    const timeout = bannerData?.timeout || 3000
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, timeout)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  return {
    showBanner,
    hideBanner,
    setBannerData,
    BannerComponent: () => {
      if (!isVisible || !bannerData) return null
      return (
        <div
          className={`${
            bannerData.type == "Success" ? "bg-green-500" : "bg-red-500"
          } z-20 absolute right-1/2 transform translate-x-1/2 md:right-10 md:translate-0  text-white p-4 rounded-lg border-white border-2 min-w-84 top-10 ${bannerData.className}`}
        >
          <h2 className="font-bold text-lg">{bannerData.heading}</h2>
          <p className="text-sm">{bannerData.message}</p>
        </div>
      )
    },
  }
}
