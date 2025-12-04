import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="px-8 py-6 border-b-2 border-black">
        <div className="max-w-4xl mx-auto">
          <Link to="/p/flonk" className="text-xl font-bold tracking-tighter hover:opacity-70 transition-opacity">
            ← BACK TO FLONK
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 py-16">
        <motion.h1
          className="text-5xl md:text-7xl font-black tracking-tighter mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          PRIVACY POLICY
        </motion.h1>

        <motion.div
          className="space-y-8 text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p className="text-sm opacity-70">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section>
            <p className="opacity-80">
              Franz Benthin ("we," "us," or "our") operates the FLONK mobile application ("the App"). This Privacy
              Policy explains how we collect, use, disclose, and safeguard your information when you use our App.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">1. Information We Collect</h2>

            <h3 className="text-xl font-bold mb-2 mt-4">1.1 Information You Provide</h3>
            <p className="opacity-80 mb-4">We may collect information that you provide directly, including:</p>
            <ul className="list-disc list-inside space-y-2 opacity-80 ml-4">
              <li>Account information (username, email address)</li>
              <li>Profile information (avatar, display name)</li>
              <li>User-generated content (game settings, preferences)</li>
              <li>Communication data (support requests, feedback)</li>
            </ul>

            <h3 className="text-xl font-bold mb-2 mt-6">1.2 Automatically Collected Information</h3>
            <p className="opacity-80 mb-4">When you use the App, we automatically collect:</p>
            <ul className="list-disc list-inside space-y-2 opacity-80 ml-4">
              <li>Device information (device type, operating system, unique device identifiers)</li>
              <li>Usage data (gameplay statistics, session duration, features used)</li>
              <li>Performance data (crash reports, error logs)</li>
              <li>Analytics data (interaction with app features, navigation patterns)</li>
            </ul>

            <h3 className="text-xl font-bold mb-2 mt-6">1.3 Information from Third Parties</h3>
            <p className="opacity-80">
              We may receive information from third-party services such as Apple Game Center, analytics providers,
              and advertising partners.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">2. How We Use Your Information</h2>
            <p className="opacity-80 mb-4">We use collected information for:</p>
            <ul className="list-disc list-inside space-y-2 opacity-80 ml-4">
              <li>Providing and maintaining the App's functionality</li>
              <li>Improving user experience and game features</li>
              <li>Analyzing usage patterns and App performance</li>
              <li>Providing customer support and responding to inquiries</li>
              <li>Sending updates, security alerts, and administrative messages</li>
              <li>Detecting and preventing fraud or abuse</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">3. Data Sharing and Disclosure</h2>
            <p className="opacity-80 mb-4">We may share your information with:</p>
            <ul className="list-disc list-inside space-y-2 opacity-80 ml-4">
              <li>
                <strong>Service Providers:</strong> Third-party vendors who perform services on our behalf (analytics,
                hosting, customer support)
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to protect our rights and safety
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition
              </li>
            </ul>
            <p className="opacity-80 mt-4">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">4. Data Security</h2>
            <p className="opacity-80">
              We implement appropriate technical and organizational measures to protect your information. However, no
              method of transmission over the internet or electronic storage is 100% secure. While we strive to use
              commercially acceptable means to protect your data, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">5. Data Retention</h2>
            <p className="opacity-80">
              We retain your information only as long as necessary to fulfill the purposes outlined in this Privacy
              Policy, unless a longer retention period is required or permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">6. Your Rights</h2>
            <p className="opacity-80 mb-4">Depending on your location, you may have rights to:</p>
            <ul className="list-disc list-inside space-y-2 opacity-80 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict data processing</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
            </ul>
            <p className="opacity-80 mt-4">
              To exercise these rights, please contact us at{' '}
              <a href="mailto:hi@franz.cx" className="underline hover:opacity-70">
                hi@franz.cx
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">7. Children's Privacy</h2>
            <p className="opacity-80">
              The App is not directed to children under the age of 13. We do not knowingly collect personal
              information from children under 13. If you believe we have collected information from a child under 13,
              please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">8. International Data Transfers</h2>
            <p className="opacity-80">
              Your information may be transferred to and processed in countries other than your country of residence.
              These countries may have data protection laws different from those in your country. By using the App,
              you consent to such transfers.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">9. Third-Party Services</h2>
            <p className="opacity-80">
              The App may contain links to third-party websites or services. We are not responsible for the privacy
              practices of these third parties. We encourage you to review their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">10. Analytics and Advertising</h2>
            <p className="opacity-80">
              We may use third-party analytics services to understand how users interact with the App. These services
              may use cookies and similar technologies to collect information about your usage.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">11. Changes to This Privacy Policy</h2>
            <p className="opacity-80">
              We may update this Privacy Policy from time to time. We will notify you of significant changes by
              posting the new Privacy Policy in the App and updating the "Last updated" date. Your continued use of
              the App after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">12. Contact Us</h2>
            <p className="opacity-80">
              If you have questions or concerns about this Privacy Policy, please contact us at:
            </p>
            <div className="opacity-80 mt-4 space-y-1">
              <p>
                Email:{' '}
                <a href="mailto:hi@franz.cx" className="underline hover:opacity-70">
                  hi@franz.cx
                </a>
              </p>
              <p>Franz Benthin</p>
              <p>Berlin, Germany</p>
            </div>
          </section>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          className="mt-16 pt-8 border-t-2 border-black flex gap-6 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link to="/p/flonk/terms" className="hover:opacity-70 transition-opacity">
            Terms of Service
          </Link>
          <Link to="/p/flonk/eula" className="hover:opacity-70 transition-opacity">
            EULA
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
