import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare } from 'lucide-react';
import { toast } from 'react-toastify';
import GlassCard from '../ui/GlassCard';

import Button from '../ui/Button';
import { validateEmail } from '../../utils/helpers';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            setIsSubmitting(true);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast.success('Message sent successfully! We\'ll get back to you soon.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            // Reset form
            setFormData({ name: '', email: '', message: '' });
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-20 px-4 scroll-mt-20">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">
                        Get In Touch
                    </h2>
                    <p className="text-center text-white/70 mb-12">
                        Have questions or feedback? We'd love to hear from you!
                    </p>

                    <GlassCard className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Input */}
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 z-10" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className={`
                    w-full pl-12 pr-4 py-3 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20
                    text-white placeholder-white/50 focus:outline-none focus:border-cyan-400/50 
                    focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300
                    ${errors.name ? 'border-red-400/50' : ''}
                  `}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                                )}
                            </div>

                            {/* Email Input */}
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 z-10" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Your Email"
                                    className={`
                    w-full pl-12 pr-4 py-3 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20
                    text-white placeholder-white/50 focus:outline-none focus:border-cyan-400/50 
                    focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300
                    ${errors.email ? 'border-red-400/50' : ''}
                  `}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                                )}
                            </div>

                            {/* Message Textarea */}
                            <div className="relative">
                                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-white/50 z-10" />
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Your Message"
                                    rows="5"
                                    className={`
                    w-full pl-12 pr-4 py-3 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20
                    text-white placeholder-white/50 focus:outline-none focus:border-cyan-400/50 
                    focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 resize-none
                    ${errors.message ? 'border-red-400/50' : ''}
                  `}
                                />
                                {errors.message && (
                                    <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full"
                                disabled={isSubmitting}
                                icon={<Send className="w-5 h-5" />}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </Button>
                        </form>
                    </GlassCard>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection;
