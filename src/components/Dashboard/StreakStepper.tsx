import { Check, Flame, Trophy, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakDay {
  date: string;
  completed: boolean;
}

interface StreakStepperProps {
  streaks: StreakDay[];
}

export function StreakStepper({
  streaks,
}: StreakStepperProps) {
  let completedCount = streaks.filter((d) => d.completed).length;


  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <Flame className="h-6 w-6 text-orange-500" />

        <div>
          <h2 className="text-lg font-semibold">
            7 Days Consistency Challenge
          </h2>

          <p className="text-sm text-muted-foreground">
            Stay consistent for 7 consecutive days.
          </p>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex justify-between">
        {streaks.map((day, index) => {
          const isLast = index === streaks.length - 1;

          return (
            <div
              key={day.date}
              className="flex flex-1 items-center"
            >
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",

                    day.completed
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-muted bg-muted text-muted-foreground"
                  )}
                >
                  {index === 6 ? (
                    <Trophy className="h-5 w-5" />
                  ) : day.completed ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <X className="h-4 w-4" />
                  )}
                </div>

                <span className="mt-2 text-xs text-muted-foreground">
                  Day {index + 1}
                </span>
              </div>

              {!isLast && (
                <div
                  className={cn(
                    "mb-6 h-1 flex-1",
                    day.completed &&
                      streaks[index + 1].completed
                      ? "bg-green-500"
                      : "bg-muted"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Progress
        </span>

        <div
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-semibold",
            completedCount === 7
              ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
              : "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300"
          )}
        >
          {completedCount}/7 Days
        </div>
      </div>
    </div>
  );
}