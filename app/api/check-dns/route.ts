import { NextResponse } from "next/server"

export async function GET() {
  try {
    const checkUrl = "http://check.nebula.mousiol.ir"

    const response = await fetch(checkUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; DNS-Checker/1.0)",
      },
    })

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("DNS check error:", error)
    return NextResponse.json(
      {
        client_ip: "unknown",
        ip_version: "IPv4",
        log_subdomain: "",
        message: "Service unavailable",
        request_subdomain: "",
        status: "error",
      },
      { status: 500 },
    )
  }
}
