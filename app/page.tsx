"use client"

import { useState } from "react"
import { Copy, Check, Gamepad2, Code, Zap, Heart, Download, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DNSShowcase() {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

  const copyToClipboard = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address)
      setCopiedAddress(address)
      setTimeout(() => setCopiedAddress(null), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const dnsServers = [
    {
      id: "gaming",
      title: "Gaming DNS",
      description: "Optimized for low latency gaming and streaming",
      icon: <Gamepad2 className="h-6 w-6" />,
      color: "from-blue-500 to-purple-600",
      ipv4: "193.228.168.150",
      ipv6: ["2a14:ec00:0003:0001:0000:000:6e2a:05b0", "2a14:ec00:0003:0001:0000:000:fb78:a069"],
    },
    {
      id: "programming",
      title: "Programming & AdBlock DNS",
      description: "Enhanced security with ad blocking and malware protection",
      icon: <Code className="h-6 w-6" />,
      color: "from-green-500 to-teal-600",
      ipv4: "45.38.139.111",
      ipv6: ["2a13:7c00:6:22:f816:3eff:feb0:1ab4", "2a13:7c00:6:22:f816:3eff:feb0:1ab4"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 opacity-0 animate-lightning rounded-full"></div>
              <Zap className="h-8 w-8 text-white relative z-10" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Nebula DNS Servers
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            High-performance DNS servers optimized for different use cases. Choose the one that best fits your needs.
          </p>
        </div>

        {/* DNS Server Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {dnsServers.map((server, index) => (
            <Card
              key={server.id}
              className={`group relative overflow-hidden bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-slide-up`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${server.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              ></div>

              <CardHeader className="relative z-10">
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`p-2 bg-gradient-to-r ${server.color} rounded-lg text-white`}>{server.icon}</div>
                  <CardTitle className="text-2xl font-bold text-white">{server.title}</CardTitle>
                </div>
                <CardDescription className="text-slate-300 text-base">{server.description}</CardDescription>
              </CardHeader>

              <CardContent className="relative z-10 space-y-6">
                {/* IPv4 Address */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      IPv4
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-white/10">
                    <code className="text-lg font-mono text-white">{server.ipv4}</code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(server.ipv4)}
                      className="text-white hover:bg-white/10 transition-all duration-200"
                    >
                      {copiedAddress === server.ipv4 ? (
                        <Check className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* IPv6 Addresses */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      IPv6
                    </Badge>
                  </div>
                  {server.ipv6.map((address, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-white/10"
                    >
                      <code className="text-sm font-mono text-white break-all">{address}</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(address)}
                        className="text-white hover:bg-white/10 transition-all duration-200 ml-2 flex-shrink-0"
                      >
                        {copiedAddress === address ? (
                          <Check className="h-4 w-4 text-green-400" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-12 animate-fade-in-delayed">
          <Button
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
            onClick={() => window.open("#", "_blank")}
          >
            <Heart className="h-4 w-4 mr-2 text-red-400" />
            Donate
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
            onClick={() => window.open("#", "_blank")}
          >
            <Download className="h-4 w-4 mr-2 text-blue-400" />
            DNS App
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
            onClick={() => window.open("#", "_blank")}
          >
            <MessageCircle className="h-4 w-4 mr-2 text-cyan-400" />
            Telegram
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 animate-fade-in-delayed">
          <p className="text-slate-400 text-sm">
            Simply copy and paste these addresses into your network settings to get started.
          </p>
        </div>
      </div>
    </div>
  )
}
