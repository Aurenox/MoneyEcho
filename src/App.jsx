import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Wallet,
  CreditCard,
  Target,
  DollarSign,
  Car,
  Home,
  BriefcaseBusiness,
  PiggyBank,
  RotateCcw,
  Info,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./index.css";

const INITIAL_FORM = {
  age: 18,
  income: 3000,
  expenses: 2000,
  savings: 5000,
  debt: 1000,
  investing: 300,
  goal: "Build my first $100k",
};

const GOALS = {
  "Build my first $100k": 100000,
  "Buy my first home": 150000,
  "Pay off my debt": 0,
  "Build an emergency fund": 10000,
  "Retire early": 1000000,
};

function App() {
  const [screen, setScreen] = useState("landing");
  const [form, setForm] = useState(INITIAL_FORM);

  function updateForm(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  if (screen === "landing") {
    return (
      <Landing
        onStart={() => setScreen("profile")}
      />
    );
  }

  if (screen === "profile") {
    return (
      <Profile
        form={form}
        updateForm={updateForm}
        onBack={() => setScreen("landing")}
        onContinue={() => setScreen("dashboard")}
      />
    );
  }

  return (
    <Dashboard
      form={form}
      onBack={() => setScreen("profile")}
      onRestart={() => {
        setForm(INITIAL_FORM);
        setScreen("landing");
      }}
    />
  );
}

/* =========================================
   LANDING
========================================= */

function Landing({ onStart }) {
  return (
    <div className="page">
      <Header />

      <main className="hero">
        <div className="eyebrow">
          <Sparkles size={15} />
          PERSONAL FINANCE, REIMAGINED
        </div>

        <h1>
          Every financial
          <br />
          decision leaves an <span>echo.</span>
        </h1>

        <p className="hero-copy">
          MoneyEcho turns your income, spending,
          savings and goals into a living picture
          of your financial future.
        </p>

        <button
          className="primary-button hero-button"
          onClick={onStart}
        >
          Build My Financial Future
          <ArrowRight size={19} />
        </button>

        <div className="hero-preview">
          <div className="preview-glow" />

          <div className="preview-card">
            <div className="preview-top">
              <div>
                <small>
                  PROJECTED NET WORTH
                </small>

                <strong>$82,450</strong>
              </div>

              <div className="preview-badge">
                <TrendingUp size={15} />
                +$78,450
              </div>
            </div>

            <div className="fake-chart">
              <div className="fake-line" />
            </div>

            <div className="preview-years">
              <span>18</span>
              <span>20</span>
              <span>22</span>
              <span>24</span>
              <span>26</span>
              <span>28</span>
              <span>30</span>
            </div>
          </div>
        </div>

        <div className="feature-row">
          <Feature
            icon={<TrendingUp />}
            title="Project"
            text="See where your current trajectory leads."
          />

          <Feature
            icon={<Sparkles />}
            title="Simulate"
            text="Change one decision and watch the future shift."
          />

          <Feature
            icon={<Target />}
            title="Act"
            text="Turn your numbers into practical next steps."
          />
        </div>
      </main>
    </div>
  );
}

/* =========================================
   PROFILE
========================================= */

function Profile({
  form,
  updateForm,
  onBack,
  onContinue,
}) {
  return (
    <div className="page">
      <Header
        left={
          <button
            className="back-button"
            onClick={onBack}
          >
            <ArrowLeft size={17} />
            Back
          </button>
        }
        right="STEP 1 OF 2"
      />

      <main className="profile-container">
        <div className="section-label">
          YOUR FINANCIAL PROFILE
        </div>

        <h1 className="page-title">
          Tell us about your money.
        </h1>

        <p className="page-description">
          We’ll use these numbers to create an
          illustrative financial trajectory.
        </p>

        <div className="input-grid">
          <MoneyInput
            icon={<Target />}
            label="Your age"
            value={form.age}
            suffix="years"
            onChange={(value) =>
              updateForm("age", value)
            }
          />

          <MoneyInput
            icon={<DollarSign />}
            label="Monthly income"
            value={form.income}
            prefix="$"
            suffix="/ month"
            onChange={(value) =>
              updateForm("income", value)
            }
          />

          <MoneyInput
            icon={<Wallet />}
            label="Monthly expenses"
            value={form.expenses}
            prefix="$"
            suffix="/ month"
            onChange={(value) =>
              updateForm("expenses", value)
            }
          />

          <MoneyInput
            icon={<Wallet />}
            label="Current savings"
            value={form.savings}
            prefix="$"
            onChange={(value) =>
              updateForm("savings", value)
            }
          />

          <MoneyInput
            icon={<CreditCard />}
            label="Current debt"
            value={form.debt}
            prefix="$"
            onChange={(value) =>
              updateForm("debt", value)
            }
          />

          <MoneyInput
            icon={<TrendingUp />}
            label="Monthly investing"
            value={form.investing}
            prefix="$"
            suffix="/ month"
            onChange={(value) =>
              updateForm("investing", value)
            }
          />
        </div>

        <div className="goal-card">
          <div className="goal-icon">
            <Target size={19} />
          </div>

          <div className="goal-content">
            <label>
              What's your financial goal?
            </label>

            <select
              value={form.goal}
              onChange={(event) =>
                updateForm(
                  "goal",
                  event.target.value
                )
              }
            >
              {Object.keys(GOALS).map(
                (goal) => (
                  <option key={goal}>
                    {goal}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        <button
          className="primary-button full-button"
          onClick={onContinue}
        >
          Build My Financial Future
          <ArrowRight size={19} />
        </button>

        <div className="privacy-note">
          <ShieldCheck size={15} />
          Your information stays in this
          browser for this demo.
        </div>
      </main>
    </div>
  );
}

/* =========================================
   DASHBOARD
========================================= */

function Dashboard({
  form,
  onBack,
  onRestart,
}) {
  const [investing, setInvesting] =
    useState(form.investing);

  const [scenario, setScenario] =
    useState("none");

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const baseline = useMemo(
    () =>
      calculateProjection(
        form,
        form.investing
      ),
    [form]
  );

  const current = useMemo(
    () =>
      calculateProjection(
        form,
        investing
      ),
    [form, investing]
  );

  const scenarioForm = useMemo(
    () =>
      applyScenario(
        form,
        scenario,
        investing
      ),
    [form, scenario, investing]
  );

  const scenarioProjection = useMemo(
    () =>
      calculateProjection(
        scenarioForm,
        scenarioForm.investing
      ),
    [scenarioForm]
  );

  const currentNetWorth =
    form.savings - form.debt;

  const goalAmount =
    GOALS[form.goal];

  const goalProgress =
    goalAmount === 0
      ? form.debt <= 0
        ? 100
        : 0
      : Math.min(
          100,
          Math.max(
            0,
            (current.finalNetWorth /
              goalAmount) *
              100
          )
        );

  const ageAtEnd =
    form.age + 12;

  async function askCoach(
    customQuestion = question
  ) {
    if (!customQuestion.trim()) {
      return;
    }

    setQuestion(customQuestion);
    setLoading(true);
    setAnswer(null);

    try {
      const response = await fetch(
        "http://localhost:3001/api/coach",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            age: form.age,
            income: form.income,
            expenses: form.expenses,
            savings: form.savings,
            debt: form.debt,
            investing,
            goal: form.goal,
            question: customQuestion,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Request failed"
        );
      }

      setAnswer(data);
    } catch (error) {
      console.error(error);

      setAnswer({
        error:
          "I couldn't connect to MoneyEcho AI. Make sure the Gemini server is running.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <Header
        left={
          <button
            className="back-button"
            onClick={onBack}
          >
            <ArrowLeft size={17} />
            Profile
          </button>
        }
        right={
          <button
            className="restart-button"
            onClick={onRestart}
          >
            <RotateCcw size={14} />
            Restart
          </button>
        }
      />

      <main className="dashboard">

        {/* DASHBOARD HEADER */}

        <div className="dashboard-heading">
          <div>
            <div className="section-label">
              YOUR FINANCIAL ECHO
            </div>

            <h1 className="dashboard-title">
              Here's where your money
              could take you.
            </h1>

            <p>
              Explore your trajectory,
              then change one decision
              and see what echoes into
              the future.
            </p>
          </div>

          <div className="scenario-pill">
            <Sparkles size={15} />
            LIVE SIMULATION
          </div>
        </div>

        {/* METRICS */}

        <div className="metrics-grid">
          <Metric
            title="Current net worth"
            value={money(
              currentNetWorth
            )}
            subtitle="Savings − debt"
          />

          <Metric
            title={`Projected at ${ageAtEnd}`}
            value={money(
              current.finalNetWorth
            )}
            subtitle="Illustrative scenario"
          />

          <Metric
            title="Monthly surplus"
            value={money(
              Math.max(
                0,
                form.income -
                  form.expenses
              )
            )}
            subtitle="Income − expenses"
          />
        </div>

        {/* CHART */}

        <section className="panel chart-panel">
          <div className="panel-header">
            <div>
              <div className="muted-label">
                PROJECTED NET WORTH
              </div>

              <h2>
                Your financial trajectory
              </h2>
            </div>

            <div className="growth-badge">
              <TrendingUp size={15} />

              +{money(
                current.growth
              )}
            </div>
          </div>

          <div className="chart">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <AreaChart
                data={current.data}
              >
                <defs>
                  <linearGradient
                    id="echoGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#34d399"
                      stopOpacity={0.3}
                    />

                    <stop
                      offset="100%"
                      stopColor="#34d399"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke="#242424"
                  strokeDasharray="4 4"
                />

                <XAxis
                  dataKey="age"
                  stroke="#666"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  stroke="#666"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) =>
                    `$${Math.round(
                      value / 1000
                    )}k`
                  }
                />

                <Tooltip
                  contentStyle={{
                    background:
                      "#0b0b0b",
                    border:
                      "1px solid #2b2b2b",
                    borderRadius:
                      "12px",
                    color: "#fff",
                  }}
                  formatter={(value) => [
                    money(value),
                    "Net worth",
                  ]}
                />

                <Area
                  type="monotone"
                  dataKey="netWorth"
                  stroke="#34d399"
                  strokeWidth={3}
                  fill="url(#echoGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="assumption">
            <Info size={14} />

            Projection assumes a 7% annual
            investment return and consistent
            monthly contributions. Actual
            results vary.
          </div>
        </section>

        {/* INVESTMENT + GOAL */}

        <div className="two-column">

          <section className="panel">
            <div className="panel-header">
              <div>
                <div className="muted-label">
                  CHANGE ONE DECISION
                </div>

                <h2>
                  Monthly investing
                </h2>
              </div>

              <div className="slider-value">
                ${investing.toLocaleString()}
              </div>
            </div>

            <input
              className="slider"
              type="range"
              min="0"
              max="2000"
              step="50"
              value={investing}
              onChange={(event) =>
                setInvesting(
                  Number(
                    event.target.value
                  )
                )
              }
            />

            <div className="slider-labels">
              <span>$0</span>
              <span>$2,000</span>
            </div>

            <div className="insight-box">
              <Sparkles size={17} />

              <div>
                <div className="insight-label">
                  MONEY ECHO
                </div>

                <p>
                  {getInvestmentInsight(
                    form,
                    investing,
                    current
                  )}
                </p>
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="muted-label">
              YOUR GOAL
            </div>

            <h2>
              {form.goal}
            </h2>

            <div className="goal-number">
              {Math.round(
                goalProgress
              )}
              %
            </div>

            <div className="progress-track">
              <div
                className="progress-bar"
                style={{
                  width: `${goalProgress}%`,
                }}
              />
            </div>

            <div className="goal-details">
              <span>
                Target{" "}
                {goalAmount === 0
                  ? "debt-free"
                  : money(
                      goalAmount
                    )}
              </span>

              <span>
                {money(
                  current.finalNetWorth
                )}
              </span>
            </div>
          </section>

        </div>

        {/* MONEY ECHO LAB */}

        <section className="panel scenario-panel">

          <div className="section-label">
            THE MONEY ECHO LAB
          </div>

          <h2 className="scenario-title">
            What if you changed one
            thing?
          </h2>

          <p className="scenario-description">
            Explore common financial
            decisions and instantly see
            their long-term impact.
          </p>

          <div className="scenario-grid">

            <Scenario
              icon={<Car />}
              title="Buy a car"
              subtitle="+$400/mo"
              active={
                scenario === "car"
              }
              onClick={() =>
                setScenario(
                  scenario === "car"
                    ? "none"
                    : "car"
                )
              }
            />

            <Scenario
              icon={<Home />}
              title="Move"
              subtitle="+$600/mo"
              active={
                scenario === "home"
              }
              onClick={() =>
                setScenario(
                  scenario === "home"
                    ? "none"
                    : "home"
                )
              }
            />

            <Scenario
              icon={
                <BriefcaseBusiness />
              }
              title="Get a raise"
              subtitle="+$700/mo"
              active={
                scenario === "raise"
              }
              onClick={() =>
                setScenario(
                  scenario === "raise"
                    ? "none"
                    : "raise"
                )
              }
            />

            <Scenario
              icon={<CreditCard />}
              title="Take on debt"
              subtitle="+$10k debt"
              active={
                scenario === "debt"
              }
              onClick={() =>
                setScenario(
                  scenario === "debt"
                    ? "none"
                    : "debt"
                )
              }
            />

            <Scenario
              icon={<PiggyBank />}
              title="Invest more"
              subtitle="+$300/mo"
              active={
                scenario === "invest"
              }
              onClick={() =>
                setScenario(
                  scenario === "invest"
                    ? "none"
                    : "invest"
                )
              }
            />

          </div>

          {scenario !== "none" && (
            <div className="echo-result">

              <div className="echo-card">
                <span>
                  WITHOUT THE CHANGE
                </span>

                <strong>
                  {money(
                    baseline.finalNetWorth
                  )}
                </strong>

                <small>
                  at age {ageAtEnd}
                </small>
              </div>

              <div className="echo-arrow">
                <ArrowRight />
              </div>

              <div className="echo-card">
                <span>
                  WITH THE CHANGE
                </span>

                <strong>
                  {money(
                    scenarioProjection.finalNetWorth
                  )}
                </strong>

                <small>
                  at age {ageAtEnd}
                </small>
              </div>

              <div
                className={`echo-impact ${
                  scenarioProjection.finalNetWorth >=
                  baseline.finalNetWorth
                    ? "positive"
                    : "negative"
                }`}
              >
                <span>
                  ECHO EFFECT
                </span>

                <strong>
                  {scenarioProjection.finalNetWorth >=
                  baseline.finalNetWorth
                    ? "+"
                    : ""}

                  {money(
                    scenarioProjection.finalNetWorth -
                      baseline.finalNetWorth
                  )}
                </strong>

                <small>
                  after 12 years
                </small>
              </div>

            </div>
          )}
        </section>

        {/* GEMINI AI */}

        <section className="coach">

          <div className="coach-heading">

            <div className="coach-icon">
              <Sparkles size={21} />
            </div>

            <div>
              <div className="coach-label">
                MONEY ECHO AI
              </div>

              <h2>
                Ask your financial future.
              </h2>
            </div>

          </div>

          <p className="coach-description">
            Ask a question about your
            money. Gemini analyzes your
            financial profile and explains
            the tradeoffs.
          </p>

          <div className="quick-questions">

            <button
              onClick={() =>
                askCoach(
                  "How can I reach my financial goal faster?"
                )
              }
            >
              Reach my goal faster
            </button>

            <button
              onClick={() =>
                askCoach(
                  "Should I invest more or save more?"
                )
              }
            >
              Invest or save?
            </button>

            <button
              onClick={() =>
                askCoach(
                  "Can I afford a $30,000 car?"
                )
              }
            >
              Can I afford a car?
            </button>

          </div>

          <div className="coach-input">

            <input
              value={question}
              onChange={(event) =>
                setQuestion(
                  event.target.value
                )
              }
              onKeyDown={(event) => {
                if (
                  event.key === "Enter"
                ) {
                  askCoach();
                }
              }}
              placeholder="Ask MoneyEcho anything..."
            />

            <button
              onClick={() =>
                askCoach()
              }
              disabled={loading}
            >
              {loading ? (
                "Thinking..."
              ) : (
                <>
                  Ask
                  <ArrowRight size={16} />
                </>
              )}
            </button>

          </div>

          {answer && (
            <AIAnswer answer={answer} />
          )}

        </section>

        <footer>
          <span>MoneyEcho</span>

          <span>
            Educational projection only —
            not financial advice.
          </span>
        </footer>

      </main>
    </div>
  );
}

/* =========================================
   AI ANSWER
========================================= */

function AIAnswer({ answer }) {
  if (answer?.error) {
    return (
      <div className="ai-error">
        <Info size={15} />
        <span>{answer.error}</span>
      </div>
    );
  }

  const tone =
    answer.tone || "neutral";

  const ToneIcon =
    tone === "positive"
      ? CheckCircle2
      : tone === "warning"
        ? AlertTriangle
        : Info;

  return (
    <div
      className={`ai-answer ai-${tone}`}
    >

      <div className="ai-response-header">

        <div className="ai-response-status">
          <span className="ai-status-dot" />

          ANALYSIS COMPLETE
        </div>

        <span className="ai-gemini">
          GEMINI AI
        </span>

      </div>

      {answer.verdict && (
        <div className="ai-verdict">

          <div className="ai-label">
            VERDICT
          </div>

          <div className="ai-verdict-row">

            <ToneIcon
              className="ai-tone-icon"
              size={21}
            />

            <h3>
              {answer.verdict}
            </h3>

          </div>

        </div>
      )}

      {answer.why?.length > 0 && (
        <div className="ai-why">

          <div className="ai-label">
            WHY
          </div>

          <div className="ai-points">

            {answer.why.map(
              (point, index) => (
                <div
                  className="ai-point"
                  key={index}
                >

                  <span className="ai-number">
                    {String(
                      index + 1
                    ).padStart(2, "0")}
                  </span>

                  <p>
                    {point}
                  </p>

                </div>
              )
            )}

          </div>
        </div>
      )}

      {answer.bestMove && (
        <div className="ai-best">

          <div className="ai-label">
            BEST MOVE
          </div>

          <p>
            {answer.bestMove}
          </p>

        </div>
      )}

      {answer.echo && (
        <div className="ai-echo">

          <div className="ai-label">
            YOUR MONEY ECHO
          </div>

          <p>
            {answer.echo}
          </p>

        </div>
      )}

    </div>
  );
}

/* =========================================
   COMPONENTS
========================================= */

function Header({
  left,
  right,
}) {
  return (
    <header className="header">
      <div className="header-inner">

        <div className="header-left">
          {left || <Logo />}
        </div>

        <div className="header-right">
          {right}
        </div>

      </div>
    </header>
  );
}

function Logo() {
  return (
    <div className="logo">
      Money<span>Echo</span>
    </div>
  );
}

function Feature({
  icon,
  title,
  text,
}) {
  return (
    <div className="feature">

      <div className="feature-icon">
        {icon}
      </div>

      <div>
        <strong>{title}</strong>

        <p>{text}</p>
      </div>

    </div>
  );
}

function MoneyInput({
  icon,
  label,
  value,
  prefix = "",
  suffix = "",
  onChange,
}) {
  return (
    <div className="money-input">

      <div className="input-label">
        <div>{icon}</div>
        <span>{label}</span>
      </div>

      <div className="input-row">

        <span className="prefix">
          {prefix}
        </span>

        <input
          type="number"
          min="0"
          value={value}
          onChange={(event) =>
            onChange(
              Number(
                event.target.value
              )
            )
          }
        />

        <span className="suffix">
          {suffix}
        </span>

      </div>

    </div>
  );
}

function Metric({
  title,
  value,
  subtitle,
}) {
  return (
    <div className="metric">

      <span>{title}</span>

      <strong>{value}</strong>

      <small>{subtitle}</small>

    </div>
  );
}

function Scenario({
  icon,
  title,
  subtitle,
  active,
  onClick,
}) {
  return (
    <button
      className={`scenario ${
        active
          ? "scenario-active"
          : ""
      }`}
      onClick={onClick}
    >

      <div className="scenario-icon">
        {icon}
      </div>

      <strong>{title}</strong>

      <span>{subtitle}</span>

    </button>
  );
}

/* =========================================
   CALCULATIONS
========================================= */

function calculateProjection(
  form,
  monthlyInvestment
) {
  const years = 12;
  const monthlyRate =
    0.07 / 12;

  let balance =
    form.savings -
    form.debt;

  const data = [];

  for (
    let year = 0;
    year <= years;
    year++
  ) {
    data.push({
      age:
        form.age + year,

      netWorth:
        Math.max(
          0,
          Math.round(
            balance
          )
        ),
    });

    for (
      let month = 0;
      month < 12;
      month++
    ) {
      const monthlySurplus =
        Math.max(
          0,
          form.income -
            form.expenses
        );

      const contribution =
        Math.min(
          Math.max(
            0,
            monthlyInvestment
          ),
          monthlySurplus
        );

      balance =
        balance *
          (1 + monthlyRate) +
        contribution;
    }
  }

  const startingWorth =
    Math.max(
      0,
      form.savings -
        form.debt
    );

  const finalNetWorth =
    Math.max(
      0,
      Math.round(
        data[
          data.length - 1
        ].netWorth
      )
    );

  return {
    data,
    finalNetWorth,
    growth:
      Math.max(
        0,
        finalNetWorth -
          startingWorth
      ),
  };
}

function applyScenario(
  form,
  scenario,
  investing
) {
  const updated = {
    ...form,
    investing,
  };

  switch (scenario) {
    case "car":
      updated.expenses += 400;
      break;

    case "home":
      updated.expenses += 600;
      break;

    case "raise":
      updated.income += 700;
      break;

    case "debt":
      updated.debt += 10000;
      break;

    case "invest":
      updated.investing += 300;
      break;

    default:
      break;
  }

  return updated;
}

function getInvestmentInsight(
  form,
  investing,
  projection
) {
  const difference =
    investing -
    form.investing;

  if (difference > 0) {
    const baseline =
      calculateProjection(
        form,
        form.investing
      );

    const extra =
      projection.finalNetWorth -
      baseline.finalNetWorth;

    return `Increasing your monthly investment by $${difference.toLocaleString()} could add roughly ${money(
      extra
    )} to your projected net worth over 12 years under these assumptions.`;
  }

  if (difference < 0) {
    return "Lowering your investment gives you more cash available today, but reduces the amount benefiting from long-term compounding.";
  }

  return `You're currently investing $${investing.toLocaleString()} per month. Move the slider to see how changing that decision echoes into your future.`;
}

function money(value) {
  return `$${Math.round(
    value
  ).toLocaleString()}`;
}

export default App;