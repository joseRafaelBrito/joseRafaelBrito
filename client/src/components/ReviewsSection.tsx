import { motion } from "framer-motion";
import { Star, StarIcon } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { t, type Language } from "@/lib/i18n";
import type { Review } from "@shared/schema";

interface ReviewsSectionProps {
  currentLang: Language;
}

const reviewFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  comment: z.string().min(10, "Comment must be at least 10 characters"),
  rating: z.number().min(1).max(5),
});

type ReviewFormData = z.infer<typeof reviewFormSchema>;

export function ReviewsSection({ currentLang }: ReviewsSectionProps) {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery<Review[]>({
    queryKey: ['/api/reviews'],
  });

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      name: "",
      email: "",
      comment: "",
      rating: 0,
    },
  });

  const createReviewMutation = useMutation({
    mutationFn: async (data: ReviewFormData) => {
      const response = await apiRequest('POST', '/api/reviews', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/reviews'] });
      toast({
        title: t("Thank you for your review!", currentLang),
        description: "Your review has been submitted successfully.",
      });
      form.reset();
      setSelectedRating(0);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ReviewFormData) => {
    if (selectedRating === 0) {
      toast({
        title: "Error",
        description: t("Please fill in all fields and select a rating.", currentLang),
        variant: "destructive",
      });
      return;
    }
    
    createReviewMutation.mutate({ ...data, rating: selectedRating });
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  const renderRatingStars = () => {
    return [...Array(5)].map((_, index) => (
      <button
        key={index}
        type="button"
        className="text-3xl transition-colors duration-200"
        onMouseEnter={() => setHoverRating(index + 1)}
        onMouseLeave={() => setHoverRating(0)}
        onClick={() => setSelectedRating(index + 1)}
      >
        <Star
          className={`h-8 w-8 ${
            index < (hoverRating || selectedRating) 
              ? 'text-yellow-400 fill-current' 
              : 'text-gray-400'
          }`}
        />
      </button>
    ));
  };

  return (
    <section id="reviews" className="py-20 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-4xl lg:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t("Client Reviews", currentLang)}
        </motion.h2>
        
        {/* Existing Reviews */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-dark-surface p-6 rounded-xl shadow-lg animate-pulse">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-600 mr-4" />
                  <div>
                    <div className="h-4 bg-gray-600 rounded w-24 mb-2" />
                    <div className="h-3 bg-gray-600 rounded w-32" />
                  </div>
                </div>
                <div className="flex mb-4 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-5 w-5 bg-gray-600 rounded" />
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-600 rounded" />
                  <div className="h-4 bg-gray-600 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                className="bg-dark-surface p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-accent to-emerald-accent flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">
                      {review.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <p className="text-sm text-gray-400">Verified Client</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {renderStars(review.rating)}
                </div>
                
                <p className="text-gray-300">{review.comment}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Leave a Review Form */}
        <motion.div 
          className="max-w-2xl mx-auto bg-dark-surface p-8 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">
            {t("Leave a Review", currentLang)}
          </h3>
          
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  {...form.register("name")}
                  placeholder={t("Your Name", currentLang)}
                  className="bg-dark-primary border-dark-accent focus:border-blue-accent"
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>
              
              <div>
                <Input
                  {...form.register("email")}
                  type="email"
                  placeholder={t("Your Email", currentLang)}
                  className="bg-dark-primary border-dark-accent focus:border-blue-accent"
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>
            </div>
            
            {/* Star Rating */}
            <div className="text-center">
              <p className="mb-4 text-gray-300">
                {t("Rate your experience:", currentLang)}
              </p>
              <div className="flex justify-center space-x-2 mb-6">
                {renderRatingStars()}
              </div>
              {selectedRating === 0 && form.formState.isSubmitted && (
                <p className="text-red-500 text-sm">Please select a rating</p>
              )}
            </div>
            
            <div>
              <Textarea
                {...form.register("comment")}
                placeholder={t("Share your experience...", currentLang)}
                rows={4}
                className="bg-dark-primary border-dark-accent focus:border-blue-accent resize-none"
              />
              {form.formState.errors.comment && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.comment.message}</p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-blue-accent hover:bg-blue-600 transition-all duration-300"
              disabled={createReviewMutation.isPending}
            >
              {createReviewMutation.isPending ? "Submitting..." : t("Submit Review", currentLang)}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
