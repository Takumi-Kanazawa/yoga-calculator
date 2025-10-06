/**
 * ヨガスタジオ集客目標計算ロジック
 * N = (T / W) × C
 * W (加重平均参加率) = (p1*r1) + (p2*r2) + (p3*r3)
 * T: 1クラスの目標集客人数, C: 1週間の総クラス数
 */

function calculateGoal() {
    // 1. HTMLから入力値を取得
    const T = parseFloat(document.getElementById('targetAttendees').value);
    const C = parseFloat(document.getElementById('totalClasses').value);
    const resultOutput = document.getElementById('resultOutput');
    
    // 2. 入力値のチェック
    if (isNaN(T) || T <= 0 || isNaN(C) || C <= 0) {
        alert("目標集客人数とクラス総数には正の数値を入力してください。");
        resultOutput.style.display = 'none';
        return;
    }

    // --- 3. 固定値 (顧客層の割合と参加率) ---
    const p1 = 0.20; // 熱心な顧客層の割合
    const r1 = 1.00; // 熱心な顧客層の参加率
    const p2 = 0.60; // 通常の顧客層の割合
    const r2 = 0.50; // 通常の顧客層の参加率
    const p3 = 0.20; // 不定期な顧客層の割合
    const r3 = 0.10; // 不定期な顧客層の参加率
    
    // 4. 分母の計算 (加重平均参加率 W)
    const W = (p1 * r1) + (p2 * r2) + (p3 * r3); 
    // W = 0.20 + 0.30 + 0.02 = 0.52

    // 5. 最終的な必要な顧客総数 (N) の計算
    const N_base = T / W;
    const N_raw = N_base * C;
    
    const N_decimal = N_raw.toFixed(2);
    const N_integer = Math.ceil(N_raw); 

    // 6. 結果のHTMLへの出力

    // ⭐最終結果をハイライトボックスに出力⭐
    document.getElementById('finalResult').innerHTML = `
        <p class="box-label">目標達成に必要な総顧客数（切り上げ）：</p>
        <p class="final-value"><strong>${N_integer}</strong> <span class="unit">人</span></p>
        <p class="final-result-decimal">(計算結果: ${N_decimal} 人)</p>
    `;


    // 計算の過程
    const totalAttendance = T * C; // 期間内の総参加目標人数
    document.getElementById('calculationProcess').innerHTML = `
        <p><strong>加重平均参加率 (W):</strong> (${p1} × ${r1}) + (${p2} × ${r2}) + (${p3} × ${r3}) = ${W.toFixed(2)}</p>
        <p><strong>総参加目標人数 (1週間):</strong> ${T} (T) × ${C} (C) = ${totalAttendance} 人</p>
        <p><strong>必要な顧客総数 (N) の計算式:</strong></p>
        <p>N = ${totalAttendance} / ${W.toFixed(2)} = ${N_decimal}</p>
    `;


    // 分析とアドバイス
    document.getElementById('summary').textContent = `目標とする総集客人数 ${totalAttendance} 人を達成するためには、総顧客数 ${N_integer} 人が必要です。これは、平均参加率が約${(W * 100).toFixed(0)}%であることを考慮した結果です。`;
    
    document.getElementById('advice1').textContent = "ロイヤルティプログラム、限定ワークショップの開催などを行い、退会を防ぎ、継続利用を促しましょう。";
    document.getElementById('advice2').textContent = "リマインダーメールや参加頻度に応じた特典を提供し、参加率0.50から0.60へ向上させることを目指しましょう。";
    document.getElementById('advice3').textContent = "お試しレッスン後のフォローアップを徹底し、初回限定のパッケージプランを提案することで、通常の顧客層へ移行を促しましょう。";

    // 結果エリアを表示
    resultOutput.style.display = 'block';
}
