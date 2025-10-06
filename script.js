/**
 * ヨガスタジオ集客目標計算ロジック
 * N = T / ( (p1 * r1) + (p2 * r2) + (p3 * r3) )
 */

function calculateGoal() {
    const T = document.getElementById('targetAttendees').value;
    const resultOutput = document.getElementById('resultOutput');
    
    // 入力値のチェック
    if (!T || T <= 0) {
        alert("目標集客人数に正の数値を入力してください。");
        resultOutput.style.display = 'none';
        return;
    }

    // --- 固定値 (プロンプトより) ---
    const p1 = 0.20; // 熱心な顧客層の割合
    const r1 = 1.00; // 熱心な顧客層の参加率
    const p2 = 0.60; // 通常の顧客層の割合
    const r2 = 0.50; // 通常の顧客層の参加率
    const p3 = 0.20; // 不定期な顧客層の割合
    const r3 = 0.10; // 不定期な顧客層の参加率
    // ---------------------------------

    // 分母の計算 (加重平均参加率 W)
    const W = (p1 * r1) + (p2 * r2) + (p3 * r3); 
    // W = 0.20 + 0.30 + 0.02 = 0.52

    // 必要な顧客総数 (N) の計算
    const N_raw = T / W;
    const N_decimal = N_raw.toFixed(2); // 小数点以下第2位まで
    const N_integer = Math.ceil(N_raw); // 整数（切り上げ）

    // --- 結果のHTMLへの出力 ---

    // 1. 計算の過程
    document.getElementById('calculationProcess').innerHTML = `
        <p><strong>加重平均参加率 (分母):</strong></p>
        <p>(${p1} × ${r1}) + (${p2} × ${r2}) + (${p3} × ${r3}) = ${W.toFixed(2)}</p>
        <p><strong>必要な顧客総数 (N) の計算式:</strong></p>
        <p>N = ${T} / ${W.toFixed(2)}</p>
    `;

    // 2. 結果
    document.getElementById('finalResult').innerHTML = `
        <p class="final-result">計算結果: ${N_decimal} 人</p>
        <p class="final-result-int">目標達成に必要な顧客総数（切り上げ）：<strong>${N_integer} 人</strong></p>
    `;

    // 3. 分析とアドバイス
    document.getElementById('summary').textContent = `目標とする集客人数 ${T} 人を達成するためには、総顧客数 ${N_integer} 人が必要です。これは、平均参加率が${(W * 100).toFixed(0)}%であることを考慮した結果です。`;
    
    document.getElementById('advice1').textContent = "ロイヤルティプログラム、限定ワークショップの開催などを行い、退会を防ぎ、継続利用を促しましょう。";
    document.getElementById('advice2').textContent = "リマインダーメールや参加頻度に応じた特典（例：月4回以上参加で割引）を提供し、参加率0.50から0.60へ向上させることを目指しましょう。";
    document.getElementById('advice3').textContent = "お試しレッスン後のフォローアップを徹底し、初回限定のパッケージプランを提案することで、通常の顧客層へ移行を促しましょう。";

    // 結果エリアを表示
    resultOutput.style.display = 'block';
}
