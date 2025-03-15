import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - SocialOne',
  description: 'Privacy Policy for SocialOne - Learn how we collect, use, and protect your information.',
  openGraph: {
    title: 'Privacy Policy - SocialOne',
    description: 'Privacy Policy for SocialOne - Learn how we collect, use, and protect your information.',
    type: 'website',
    url: process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/privacy` : undefined,
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <section className="prose prose-blue max-w-none">
          <p className="text-lg mb-6">
            Last updated: {new Date().toLocaleDateString()}. At SocialOne, we take your privacy seriously. This policy describes how we collect, use, and protect your information.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Account information (email, name, social media accounts)</li>
            <li>Content you create and share through our platform</li>
            <li>Social media integration data</li>
            <li>Usage information and analytics</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
          <p>
            We use the collected information to:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Provide and improve our services</li>
            <li>Manage your social media integrations</li>
            <li>Analyze usage patterns and optimize user experience</li>
            <li>Communicate with you about our services</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Data Storage and Security</h2>
          <p>
            We implement appropriate security measures to protect your information. Your data is stored securely and accessed only by authorized personnel.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Access your personal data</li>
            <li>Request corrections to your data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of certain data collection</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at: privacy@socialone.app
          </p>
        </section>
      </div>
    </div>
  )
} 