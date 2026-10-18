

export const Footer = () => {
  return (
    <>
      <footer className="border-t bg-muted/40 text-muted-foreground py-16">
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="text-xl font-bold text-foreground mb-4">iPrepare</div>
            <p className="text-sm max-w-sm mb-6">
              Engineered for Excellence. Building the leaders, engineers, and doctors of tomorrow through disciplined ambition.
            </p>
            <p className="text-xs">
              © 2026 iPrepare. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col md:items-end justify-start space-y-4">
            <a className="text-sm hover:text-primary transition-colors" href="formals/PrivacyPolicy.html">Privacy Policy</a>
            <a className="text-sm hover:text-primary transition-colors" href="formals/TermsOfServices.html">Terms of Service</a>
            <a className="text-sm hover:text-primary transition-colors" href="#">Contact Support</a>
            <a className="text-sm hover:text-primary transition-colors" href="#">Test Series</a>
          </div>
        </div>
      </footer>
    </>
  )
}