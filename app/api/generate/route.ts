import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { cropType, acreage, soilType, irrigationType, location, organic, fertilizerUse, pestControl, description } = await req.json();

    const prompt = `You are an AI sustainable agriculture expert specializing in crop yield optimization. Analyze the following farm parameters and provide a comprehensive yield optimization plan.

Farm Parameters:
- Crop Type: ${cropType}
- Acreage: ${acreage} acres
- Soil Type: ${soilType}
- Irrigation Type: ${irrigationType}
- Location/Region: ${location}
- Organic Farming: ${organic}
- Fertilizer Regimen: ${fertilizerUse}
- Pest Control Method: ${pestControl}
- Additional Notes: ${description}

Please provide a detailed analysis including:
1. **Yield Optimization Recommendations** (top 5 strategies)
2. **Soil Health Improvement Plan** (amendments, cover crops, rotation)
3. **Water Efficiency Strategy** (irrigation optimization, rainwater harvesting)
4. **Integrated Pest Management (IPM)** recommendations
5. **Sustainable Fertilizer Protocol** (organic vs synthetic balance)
6. **Estimated Yield Improvement** (% and bushels/tons)
7. **Carbon Sequestration Potential** from soil management
8. **Seasonal Planting/Crop Rotation Calendar**
9. **Cost-Benefit Analysis** of key improvements

Format with clear markdown headings and bullet points. Be specific with numbers and percentages.`;

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error: 'DeepSeek API error', details: error }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || 'No response generated.';

    return NextResponse.json({ result: content });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Server error', details: message }, { status: 500 });
  }
}
