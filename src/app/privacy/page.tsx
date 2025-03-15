export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="space-y-6 text-gray-600">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
          <p>This privacy policy explains how SocialOne ("we", "us", or "our") collects, uses, and protects your information when you use our application.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
          <p>We collect information that you provide directly to us when you:</p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>Create an account</li>
            <li>Connect your social media accounts</li>
            <li>Create or schedule posts</li>
            <li>Interact with our services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>Provide and maintain our services</li>
            <li>Post content to your connected social media accounts with your permission</li>
            <li>Analyze your social media performance and provide insights</li>
            <li>Improve our services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Storage and Security</h2>
          <p>We use industry-standard security measures to protect your data. Your social media tokens are stored securely and are only used to provide our services.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
          <p>We integrate with various social media platforms including Facebook, Instagram, Twitter, and LinkedIn. When you connect these services, their respective privacy policies also apply.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Disconnect social media accounts</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
          <p>If you have any questions about this privacy policy, please contact us at:</p>
          <p className="mt-2">Email: mercier.k2438@gmail.com</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Updates to This Policy</h2>
          <p>We may update this privacy policy from time to time. The latest version will always be available on this page.</p>
          <p className="mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </section>
      </div>
    </div>
  )
} 