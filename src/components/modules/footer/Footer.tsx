import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-8 mt-10">
      <div className="container mx-auto px-4 space-y-6">
        <Separator />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground text-center md:text-left gap-4">
          <p>&copy; {new Date().getFullYear()} Movie & Series Portal. All rights reserved.</p>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="/privacy-policy" className="hover:underline transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline transition">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:underline transition">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
