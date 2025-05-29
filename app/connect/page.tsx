"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface DnsCheckResponse {
  client_ip: string
  ip_version: string
  log_subdomain: string
  message: string
  request_subdomain: string
  status: string
}

export default function ConnectPage() {
  const [userIpType, setUserIpType] = useState<"ipv4" | "ipv6" | null>(null)

  // Check IP version using the DNS check service
  useEffect(() => {
    const detectIpVersion = async () => {
      try {
        const checkUrl = "https://check.nebula.mousiol.ir:4443"

        const response = await fetch(checkUrl, { method: "GET" })

        if (!response.ok) {
          throw new Error(`DNS check failed with status: ${response.status}`)
        }

        const text = await response.text()
        let data: DnsCheckResponse

        try {
          data = JSON.parse(text)
        } catch (parseError) {
          setUserIpType(ipVersion)
          console.error("Failed to parse DNS response:", parseError, "Response was:", text)
          throw new Error("Invalid DNS check response")
        }

        console.log("DNS check response:", data)

        // Update IP version from response
        if (data.ip_version) {
          const ipVersion = data.ip_version.toLowerCase() === "ipv4" ? "ipv4" : "ipv6"
          setUserIpType(ipVersion)
        }

      } catch (error) {
        console.error("Error checking DNS connection:", error)
        setUserIpType("ipv4")
    }

    detectIpVersion()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to DNS Servers
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-4">How to Connect to Our DNS</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Choose your connection type to get started with step-by-step instructions.
          </p>
        </div>

        {/* Connection Type Selection */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <Link href="/connect/ipv4" className="block">
            <Card
              className={`h-full cursor-pointer bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                userIpType === "ipv4" ? "border-animated-button" : ""
              }`}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">IPv4 Connection</CardTitle>
                <CardDescription className="text-slate-300">
                  Traditional IP addresses, compatible with all networks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-500/20 text-blue-300 rounded-lg p-4 text-center">
                  <p className="text-lg font-mono">45.38.139.111</p>
                  <p className="text-lg font-mono mt-2">193.228.168.150</p>
                </div>
                {userIpType === "ipv4" && (
                  <div className="mt-4 bg-amber-500/20 border border-amber-500/30 rounded-lg p-2 text-center">
                    <p className="text-amber-300 text-sm">Recommended for your connection</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>

          <Link href="/connect/ipv6" className="block">
            <Card
              className={`h-full cursor-pointer bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                userIpType === "ipv6" ? "border-animated-button" : ""
              }`}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">IPv6 Connection</CardTitle>
                <CardDescription className="text-slate-300">
                  Next-generation IP addresses for modern networks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-purple-500/20 text-purple-300 rounded-lg p-4 text-center">
                  <p className="text-sm font-mono">2a13:7c00:6:22:f816:3eff:feb0:1ab4</p>
                  <p className="text-sm font-mono mt-2">2a14:ec00:0003:0001:0000:000:6e2a:05b0</p>
                </div>
                {userIpType === "ipv6" && (
                  <div className="mt-4 bg-amber-500/20 border border-amber-500/30 rounded-lg p-2 text-center">
                    <p className="text-amber-300 text-sm">Recommended for your connection</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
