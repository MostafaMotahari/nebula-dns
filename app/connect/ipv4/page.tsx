"use client"

import { useState } from "react"
import { ArrowLeft, Smartphone, Monitor, Apple, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function IPv4InstructionsPage() {
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
          <Link href="/connect">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Connection Types
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-4">IPv4 Connection Instructions</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Follow these steps to configure your device to use our IPv4 DNS servers.
          </p>
        </div>

        {/* DNS Addresses */}
        <div className="max-w-md mx-auto mb-12">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">IPv4 DNS Addresses</CardTitle>
              <CardDescription className="text-slate-300">Use these addresses in your network settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-white/10">
                <div>
                  <p className="text-sm text-slate-400">Primary DNS</p>
                  <code className="text-lg font-mono text-white">45.38.139.111</code>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard("45.38.139.111")}
                  className="text-white hover:bg-white/10 transition-all duration-200"
                >
                  {copiedAddress === "45.38.139.111" ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-white/10">
                <div>
                  <p className="text-sm text-slate-400">Secondary DNS</p>
                  <code className="text-lg font-mono text-white">193.228.168.150</code>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard("193.228.168.150")}
                  className="text-white hover:bg-white/10 transition-all duration-200"
                >
                  {copiedAddress === "193.228.168.150" ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Instructions */}
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="android" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8 bg-white/10 border-white/20">
              <TabsTrigger value="android" className="data-[state=active]:bg-blue-600">
                <Smartphone className="mr-2 h-4 w-4" />
                Android
              </TabsTrigger>
              <TabsTrigger value="ios" className="data-[state=active]:bg-blue-600">
                <Apple className="mr-2 h-4 w-4" />
                iOS
              </TabsTrigger>
              <TabsTrigger value="windows" className="data-[state=active]:bg-blue-600">
                <Monitor className="mr-2 h-4 w-4" />
                Windows
              </TabsTrigger>
            </TabsList>
            <TabsContent value="android" className="mt-0">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white">Android Instructions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Step 1: Open Settings</h3>
                    <p className="text-slate-300">Open your device's Settings app.</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Step 2: Go to Network Settings</h3>
                    <p className="text-slate-300">Tap on "Connections" or "Network & Internet" (may vary by device).</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Step 3: Select Wi-Fi</h3>
                    <p className="text-slate-300">Tap on "Wi-Fi" and then long-press on your connected network.</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Step 4: Modify Network</h3>
                    <p className="text-slate-300">
                      Select "Modify Network" or "Manage Network Settings" and check "Show Advanced Options".
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Step 5: Change IP Settings</h3>
                    <p className="text-slate-300">
                      Change "IP Settings" to "Static" and scroll down to the DNS fields.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Step 6: Enter DNS Addresses</h3>
                    <p className="text-slate-300">
                      Enter <code className="bg-black/30 px-1 rounded">45.38.139.111</code> as DNS 1 and{" "}
                      <code className="bg-black/30 px-1 rounded">193.228.168.150</code> as DNS 2.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Step 7: Save Changes</h3>
                    <p className="text-slate-300">Tap "Save" and reconnect to your network if necessary.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="ios" className="mt-0">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white">iOS Instructions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Step 1: Open Settings</h3>
                    <p className="text-slate-300">Open the Settings app on your iPhone or iPad.</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Step 2: Go to Wi-Fi Settings</h3>
                    <p className="text-slate-300">Tap on "Wi-Fi" and make sure Wi-Fi is turned on.</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Step 3: Select Network</h3>
                    <p className="text-slate-300">Tap the (i) information icon next to your connected Wi-Fi network.</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Step 4: Configure DNS</h3>
                    <p className="text-slate-300">
                      Scroll down and tap on "Configure DNS", then select "Manual" instead of "Automatic".
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Step 5: Add DNS Servers</h3>
                    <p className="text-slate-300">
                      Tap "Add Server" and enter <code className="bg-black/30 px-1 rounded">45.38.139.111</code>, then tap
                      "Add Server" again and enter <code className="bg-black/30 px-1 rounded">193.228.168.150</code>.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Step 6: Save Changes</h3>
                    <p className="text-slate-300">Tap "Save" in the top right corner.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="windows" className="mt-0">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white">Windows Instructions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Step 1: Open Network Settings</h3>
                    <p className="text-slate-300">
                      Right-click on the network icon in the taskbar and select "Open Network & Internet settings".
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Step 2: Go to Network Properties</h3>
                    <p className="text-slate-300">Click on "Change adapter options" under Advanced network settings.</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Step 3: Select Network Connection</h3>
                    <p className="text-slate-300">
                      Right-click on your active network connection (Wi-Fi or Ethernet) and select "Properties".
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Step 4: Select Internet Protocol</h3>
                    <p className="text-slate-300">
                      Select "Internet Protocol Version 4 (TCP/IPv4)" and click "Properties".
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Step 5: Enter DNS Addresses</h3>
                    <p className="text-slate-300">
                      Select "Use the following DNS server addresses" and enter{" "}
                      <code className="bg-black/30 px-1 rounded">45.38.139.111</code> as the Preferred DNS server and{" "}
                      <code className="bg-black/30 px-1 rounded">193.228.168.150</code> as the Alternate DNS server.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Step 6: Save Changes</h3>
                    <p className="text-slate-300">Click "OK" on both windows to save your changes.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
