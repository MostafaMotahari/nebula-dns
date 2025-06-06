import { NextResponse } from "next/server"

export async function GET() {
  try {
    const checkUrl = "https://check.nebula.mousiol.ir:4443"

    const response = await fetch(checkUrl, { method: "GET" })

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        client_ip: "unknown",
        ip_version: "IPv4",
        log_subdomain: "",
        message: "Service unavailable",
        request_subdomain: "",
        status: "error",
      },
      { status: 403 },
    )
  }
}
