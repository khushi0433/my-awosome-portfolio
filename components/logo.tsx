interface LogoProps {
  size?: "small" | "medium" | "large"
}

export default function Logo({ size = "medium" }: LogoProps) {
  // Size mapping
  const sizeMap = {
    small: {
      width: 32,
      height: 32,
      fontSize: "text-sm",
    },
    medium: {
      width: 48,
      height: 48,
      fontSize: "text-base",
    },
    large: {
      width: 80,
      height: 80,
      fontSize: "text-xl",
    },
  }

  const { width, height, fontSize } = sizeMap[size]

  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className="relative flex items-center justify-center rounded-full bg-gradient-to-br from-gray-700 to-gray-900 shadow-lg"
    >
      <div className="absolute inset-0 rounded-full border border-gray-600 opacity-50"></div>
      <span className={`font-bold text-gray-200 ${fontSize}`}>KH</span>
    </div>
  )
}
