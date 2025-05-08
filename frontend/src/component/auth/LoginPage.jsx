import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ApiService from "../../service/ApiService";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/home';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields.');
            setTimeout(() => setError(''), 5000);
            return;
        }

        try {
            setIsLoading(true);
            const response = await ApiService.loginUser({email, password});
            if (response.statusCode === 200) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('role', response.role);
                navigate(from, { replace: true });
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container-custom py-16 md:py-24 max-w-md mx-auto">
            <div className="bg-charcoal-900 border border-gold-400/20 shadow-elegant p-8 md:p-10">
                <div className="text-center mb-10">
                    <div className="inline-block mb-3">
                        <h2 className="font-display text-3xl italic font-bold text-white">
                            <span className="text-gold-400">P</span>hegon
                            <span className="text-gold-400 ml-1">H</span>otel
                        </h2>
                        <div className="h-px w-24 bg-gold-400 mx-auto my-4"></div>
                    </div>
                    <h1 className="text-2xl font-display text-white mb-2">Welcome Back</h1>
                    <p className="text-white/60 text-sm">Sign in to your account</p>
                </div>

                {error && (
                    <div className="mb-8 p-4 bg-charcoal-800 border-l-4 border-gold-400 text-white/80 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-gold-400 text-sm font-medium uppercase tracking-wider" htmlFor="email">
                            Email Address <span className="text-gold-400/60">*</span>
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                className="w-full bg-charcoal-800 border-0 border-b border-gold-400/30 focus:border-gold-400 px-3 py-2 text-white placeholder-white/30 focus:ring-0"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                            />
                            <div className="absolute right-3 top-2 text-gold-400 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-gold-400 text-sm font-medium uppercase tracking-wider" htmlFor="password">
                            Password <span className="text-gold-400/60">*</span>
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type="password"
                                className="w-full bg-charcoal-800 border-0 border-b border-gold-400/30 focus:border-gold-400 px-3 py-2 text-white placeholder-white/30 focus:ring-0"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                            <div className="absolute right-3 top-2 text-gold-400 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button 
                            type="submit"
                            className="w-full bg-gold-400 text-charcoal-950 hover:bg-gold-500 transition-colors duration-300 shadow-golden py-3 flex items-center justify-center uppercase tracking-wider text-sm font-medium"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-charcoal-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-white/60 text-sm">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-gold-400 hover:text-gold-300 transition-colors font-medium">
                            Create one here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
