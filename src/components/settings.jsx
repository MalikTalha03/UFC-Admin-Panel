/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/V7ryQsPU07A
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select";
import { TvRounded } from "@mui/icons-material";
import { Notification } from "./notificationurl";

export function Settings() {
  const [disabled, setDisabled] = useState(true);
  const [pristineSettings, setPristineSettings] = useState({});
  const [openNot, setOpenNot] = useState(false);
  const [settings, setSettings] = useState({
    adMobInterstitial: "",
    adMobBanner: "",
    adMobAppOpen: "",
    appLovinInterstitial: "",
    appLovinBanner: "",
    appLovinAppOpen: "",
    isAdMobEnabled: false,
    newLink: "",
    isNewLink: false,
    ratingLink: "",
    revenueCatKey: "",
    appLovinSdkKey: "",
  });
  useEffect(() => {
    fetchSettings();
  }, []);
  const fetchSettings = async () => {
    const response = await fetch("/api/settings");
    const data = await response.json();
    setSettings(data);
    setPristineSettings(data);
  };
  const saveSettings = async () => {
    try {
      await fetch("/api/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });
      setDisabled(true);
      setPristineSettings(settings);
    } catch (error) {
      console.error(error);
      setDisabled(false);
    }
  };
  const checkIfSettingsChanged = () => {
    return Object.keys(settings).some(
      (key) => settings[key] !== pristineSettings[key]
    );
  };

  useEffect(() => {
    console.log(settings);
    setDisabled(!checkIfSettingsChanged());
  }, [settings, pristineSettings]);

  const handleInputChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div
      key="1"
      className="grid min-h-screen w-full grid-cols-[280px_1fr] bg-gray-100 dark:bg-gray-950"
    >
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <TrophyIcon className="h-6 w-6" />
              <span>Match Manager</span>
            </Link>
            <Button
              className="ml-auto h-8 w-8"
              size="icon"
              variant="outline"
              onClick={() => setOpenNot(true)}
            >
              <BellIcon className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="/players"
              >
                <UsersIcon className="h-4 w-4" />
                Teams
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="/schedule"
              >
                <CalendarIcon className="h-4 w-4" />
                Schedule
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="/channels"
              >
                <TvChannelIcon className="h-4 w-4" />
                Channels
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="/highlights"
              >
                <TvChannelIcon className="h-4 w-4" />
                Highlights
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                href="/settings"
              >
                <SettingsIcon className="h-4 w-4" />
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 lg:h-[60px]">
          <Link className="lg:hidden" href="#">
            <TrophyIcon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div />
          <Card className="w-full max-w-3xl">
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Manage your app settings here.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="is-admob-enabled">Enable Admob?</Label>
                  <Select
                    id="is-admob-enabled"
                    value={settings.isAdMobEnabled ? "yes" : "no"} // Convert boolean to "yes" or "no"
                    onValueChange={(value) =>
                      handleInputChange("isAdMobEnabled", value === "yes")
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="yes">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interstitial-ad">
                    Admob Interstitial Ad Key
                  </Label>
                  <Input
                    id="interstitial-ad"
                    placeholder="Enter interstitial ad key"
                    value={settings.adMobInterstitial}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        adMobInterstitial: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="banner-ad">Ad MobBanner Ad Key</Label>
                  <Input
                    id="banner-ad"
                    placeholder="Enter banner ad key"
                    value={settings.adMobBanner}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        adMobBanner: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="open-app-ad">Ad Mob Open App Ad Key</Label>
                  <Input
                    id="open-app-ad"
                    placeholder="Enter open app ad key"
                    value={settings.adMobAppOpen}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        adMobAppOpen: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="applovin-key">AppLovin Sdk Key</Label>
                  <Input
                    id="applovin-banner"
                    placeholder="Enter AppLovin sdk key"
                    value={settings.appLovinSdkKey}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        appLovinSdkKey: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="applovin-key">
                    AppLovin Interstetial Ad Key
                  </Label>
                  <Input
                    id="applovin-key"
                    placeholder="Enter AppLovin key"
                    value={settings.appLovinInterstitial}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        appLovinInterstitial: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="applovin-banner">
                    AppLovin Banner Ad Key
                  </Label>
                  <Input
                    id="applovin-banner"
                    placeholder="Enter AppLovin banner key"
                    value={settings.appLovinBanner}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        appLovinBanner: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="applovin-open">
                    AppLovin Open App Ad Key
                  </Label>
                  <Input
                    id="applovin-open"
                    placeholder="Enter AppLovin open app key"
                    value={settings.appLovinAppOpen}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        appLovinAppOpen: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="revenue-cat-key">RevenueCat Key</Label>
                  <Input
                    id="revenue-cat-key"
                    placeholder="Enter RevenueCat key"
                    value={settings.revenueCatKey}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        revenueCatKey: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating-link">Rating Link</Label>
                  <Input
                    id="rating-link"
                    placeholder="Enter rating link"
                    value={settings.ratingLink}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        ratingLink: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-link">New Link</Label>
                  <Input
                    id="new-link"
                    placeholder="Enter new link"
                    value={settings.newLink}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        newLink: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="is-new-link">Is New Link</Label>
                  <Select
                    id="is-new-link"
                    value={settings.isNewLink ? "yes" : "no"} // Convert boolean to "yes" or "no"
                    onValueChange={(value) =>
                      handleInputChange("isNewLink", value === "yes")
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="yes">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="ml-auto"
                disabled={disabled}
                onClick={saveSettings}
              >
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
      <Notification open={openNot} onChange={setOpenNot} />
    </div>
  );
}

function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function TrophyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function TvChannelIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
      <path d="M12 2 L16 7 H8 L12 2 Z" /> {/* Top antenna */}
      <line x1="12" x2="12" y1="2" y2="7" /> {/* Antenna pole */}
      <line x1="2" x2="22" y1="12" y2="12" /> {/* Horizontal mid-line */}
      <line x1="7" x2="7" y1="17" y2="22" /> {/* Stand legs */}
      <line x1="12" x2="12" y1="17" y2="22" /> {/* Stand middle leg */}
      <line x1="17" x2="17" y1="17" y2="22" /> {/* Stand legs */}
      <ellipse cx="12" cy="4.5" rx="3" ry="1.5" />{" "}
      {/* Signal waves on the antenna */}
    </svg>
  );
}
